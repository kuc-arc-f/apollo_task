import LibPg from './LibPg';
//import LibConfig from './LibConfig';
import LibUser from "./LibUser"
const TIME_INIT_STR = "T00:00:00.000Z"

export default {
  /**************************************
   * タスク一覧の起動時データ
   * params : any args
   * return :
   **************************************/  
  tasksProject :async function(args: any){
    try {
console.log(args);
      const client = LibPg.getClient();
      let text = `
       SELECT * FROM public."Project" where id = ${args.projectId}
      `;
      let projects = await client.query(text);
      let project = {};
      if(projects.rows.length > 0){
        project = projects.rows[0];
      }
      text = `
       SELECT * FROM public."Task" where "projectId" = ${args.projectId}
      `;
      let tasks = await client.query(text);
//      console.log(tasks.rows);
      const item = {
        tasks: tasks.rows, project: project,
      }
      client.end();
      return item;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems:' +err);
    }          
  },
  /**************************************
   * getItems
   * params : any args
   * return :
   **************************************/
  getItems :async function(args: any)
  {
    try {
//console.log(args);
      //pg
      const client = LibPg.getClient();
      let text = `
       SELECT * FROM public."Task" where "projectId" = ${args.projectId}
      `;
      let tasks = await client.query(text);
      client.end();
//console.log(tasks.rows);      
      return tasks.rows      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems');
    }          
  },
  /**************************************
   * getItems
   * params : any args
   * return :
   **************************************/   
  getItem :async function(id: number){
    try {
      //pg
      const client = LibPg.getClient();
      let text = `
       SELECT * FROM public."Task" where "id" = ${id}
      `;
      let tasks = await client.query(text);
      client.end();
//console.log(tasks.rows);
      let task = {};
      if(tasks.rows.length > 0){
        task = tasks.rows[0];
      }
//console.log(task);
      return task;
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItem');
    }          
  },
  /**************************************
   * addTaskItem
   * params args: any
   * return :
   **************************************/
  addTaskItem :async function(args: any)
  {
    try {
      console.log( args);
      const user: any = await LibUser.getItem(args);
//console.log( user);
      if(user === null){
        throw new Error('Error , user nothing');
      }
      const completeDate = new Date(args.complete + TIME_INIT_STR) ;
      const text = `
      INSERT INTO public."Task" 
      ("projectId", title, content, "complete", "status", "userId", "createdAt", "updatedAt") 
      VALUES
      ($1, $2, $3, $4, $5, $6, current_timestamp, current_timestamp) RETURNING *
      `;      
      const values = [
        args.projectId,
        args.title,
        args.content,
        completeDate,
        args.status,
        user.id,
      ];   
      const client = LibPg.getClient();
      const res = await client.query(text, values);
      client.end();   
//      console.log(result);
      const result = res.rows[0];
console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , addTaskItem: '+ err);
    }          
  },
  /**************************************
   * updateTaskItem
   * params : args: any
   * return :
   **************************************/
  updateTaskItem :async function(args: any)
  {
    try {
//console.log(args);
      const completeDate = new Date(args.complete + TIME_INIT_STR) ;
      const text = `
      UPDATE public."Task" SET title = $1,
      content = $2,
      status = $3, 
      complete = $4,
      "updatedAt" = current_timestamp
      WHERE "id" = ${args.id}
      RETURNING *
      `;
      const values = [
        args.title,
        args.content,
        args.status,
        completeDate,
      ];
//console.log(text);           
      const client = LibPg.getClient();
      const res = await client.query(text, values);
      client.end();
      const result = res.rows[0];
//console.log(result);      
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , updateTaskItem,'+ err);
    }          
  },
  /**************************************
   * deleteTaskItem
   * params : args: any
   * return :
   **************************************/   
  deleteTaskItem :async function(args: any)
  {
    try {
      const text = `
      DELETE FROM public."Task" WHERE "id" = ${args.id}
      RETURNING *
      `;
//console.log(text); 
      const client = LibPg.getClient();
      let res = await client.query(text);
      client.end();
      const result = res.rows[0];
//console.log(result);      
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , deleteTaskItem,' + err);
    }          
  },             
}
