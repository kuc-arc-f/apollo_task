//import logger from './logger'
import LibUser from "./LibUser"
import LibPg from './LibPg';

export default {
  /**
  * getItems
  * @param args: any
  *
  * @return Promise
  */  
  getItems :async function(args: any) : Promise<any[]>
  {
    try {
console.log(args);
      const user: any = await LibUser.getItem(args);
      console.log( user);
      if(user === null){
        throw new Error('Error , user nothing');
      }
      const client = LibPg.getClient();
      let text = `
      SELECT * FROM public."Project" where "userId" = ${user.id}
       ORDER BY id DESC
      `;
      let items = await client.query(text);
      client.end();
//console.log(items.rows);
      return items.rows      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems: ' + err);
    }          
  },    
  /**
  * getItems
  * @param args: any
  *
  * @return Promise
  */
  getItem : async function(id: number): Promise<any>
  {
    try {
      const client = LibPg.getClient();
      let text = `
      SELECT * FROM public."Project" where "id" = ${id}
      `;
      let item = await client.query(text);
      if(item.rows.length > 0){
        item = item.rows[0];
      }      
      client.end();
//console.log(item);
      return item;
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItem');
    }          
  },
  /**
  * addProject
  * @param args: any
  *
  * @return Promise<any>
  */    
  addProject :async function(args: any) : Promise<any>
  {
    try {
      console.log( args);
      const invite = this.getInviteCode();
//console.log( invite);
      const user: any = await LibUser.getItem(args);
console.log( user);
      if(user === null){
        throw new Error('Error , user nothing');
      }
      const text = `
      INSERT INTO public."Project" 
      ("name", "userId", "inveiteCode", "createdAt", "updatedAt") 
      VALUES
      ($1, $2, $3, current_timestamp, current_timestamp)
       RETURNING *
      `;      
      const values = [
        args.name,
        user.id,
        invite,
      ]; 
      const client = LibPg.getClient();
      const res = await client.query(text, values);
      client.end();
      let result = {};
      if(res.rows.length > 0){
        result = res.rows[0];
      }
//      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , addProject: '+ err);
    }          
  },
  /**
  * updateProject
  * @param args: any
  *
  * @return Promise<any>
  */  
  updateProject :async function(args: any): Promise<any>
  {
    try {
      console.log(args);
      /*
      const user: any = await LibUser.getItem(args);
      console.log( user);
      if(user === null){
        throw new Error('Error , user nothing');
      }
      */
      const text = `
      UPDATE public."Project" set "name" = $1
      WHERE id = $2
       RETURNING *
      `;      
      const values = [
        args.name, args.id
      ]; 
      const client = LibPg.getClient();
      const res = await client.query(text, values);
      client.end();     
      let result = {};
      if(res.rows.length > 0){
        result = res.rows[0];
      }       
console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , updateProject ,'+ err);
    }          
  },
  /**
  * deleteProject
  * @param args: any
  *
  * @return Promise<any>
  */    
  deleteProject: async function(args: any): Promise<any>
  {
    try {
console.log(args);
      const text = `
      DELETE FROM public."Project" WHERE id = $1 
      RETURNING *
      `;      
      const values = [
        Number(args.id)
      ]; 
      const client = LibPg.getClient();
      const res = await client.query(text, values);
      client.end();
      let result = {};
      if(res.rows.length > 0){
        result = res.rows[0];
      }      
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , deleteProject,' + err);
    }          
  },
  /**
  * getRandomStr
  * @param args: any
  *
  * @return string
  */  
  getRandomStr :function(): string
  {
    const s = "0123456789"
    const random = Math.floor( Math.random()* s.length );
    if(random >= s.length){ throw new Error('Error , getRandomStr'); }
   //    console.log(s.length ,random )
    return s[random]    
  },
  /**
  * getInviteCode
  * @param args: any
  *
  * @return string
  */   
  getInviteCode: function(): string
  {
    try{
      let s = ""
      for(let i=0; i< 4; i++ ){
        s += this.getRandomStr()
      }
//      console.log(s)
      return s
    } catch (err) {
      console.error(err);
      throw new Error('error, getInviteCode:' + err);
    }    
  },                 
}
