import LibPg from './LibPg';

export default {
  getItems :async function(){
    try {
      console.log("tasks");
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems');
    }          
  },
  /**************************************
   * getItem
   * params args: any
   * return :
   **************************************/    
  getItem :async function(args: any)
  {
    try {
//console.log(args);
    const client = LibPg.getClient();
    let text = `
    SELECT * FROM public."User" where "firebaseUid" = '${args.firebaseUid}'
    `;
    let tasks = await client.query(text);
    client.end();
    let task = null;
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
   * addUser
   * params args: any
   * return :
   **************************************/      
  addUser: async function(args: any)
  {
    try {
      console.log( args); 
      const text = `
      INSERT INTO public."User" 
      ("name", email, "firebaseUid", "createdAt", "updatedAt") 
      VALUES
      ($1, $2, $3, current_timestamp, current_timestamp)
       RETURNING *
      `;      
      const values = [
        args.name,
        args.email,
        args.firebaseUid,
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
      throw new Error('Error , addUser: '+ err);
    }          
  },
  updateTask :async function(args: any){
    try {
//console.log( args); 
console.log(args);
      return {};
    } catch (err) {
      console.error(err);
      throw new Error('Error , updateTask,'+ err);
    }          
  },  
  deleteTask :async function(args: any){
    try {
console.log(args);
      return {};
    } catch (err) {
      console.error(err);
      throw new Error('Error , deleteTask,' + err);
    }          
  },             
}
