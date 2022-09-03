import logger from './logger'
import LibUser from "./LibUser"
import LibPg from './LibPg';

export default {
  /**************************************
   * getItems
   * params : any args
   * return : array items
   **************************************/ 
  getItems : async function(args: any){
    try {
//console.log(args);
      const client = LibPg.getClient();
      let text = `
      SELECT *  FROM public."ProjectMember" WHERE "projectId" = ${args.projectId}
      ORDER BY id DESC
      `;
      let members = await client.query(text);
      client.end();
      let items = [];
      if(members.rows.length > 0){
        items = members.rows;
        console.log(members.rows);
      }
      return items      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems: ' + err);
    }          
  },  
  /**************************************
   * countProjectMembers
   * params : any args
   * return : int count
   **************************************/ 
  countProjectMembers :async function(args: any)
  {
    try {
console.log(args);
      const user: any = await LibUser.getItem(args);
//console.log( user);
      if(user === null){
        throw new Error('Error , user nothing');
      }
      const client = LibPg.getClient();
      let text = `
      SELECT count(*) FROM public."ProjectMember" where "projectId" = ${args.projectId}
      AND "userId" = ${user.id}
      `;
      let members = await client.query(text);
      let member = null;
      if(members.rows.length > 0){
        member = members.rows[0];
      }
console.log( "count=", member.count);
    const count = member.count;
      return count;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , countProjectMembers: ' + err);
    }          
  },  
  /*
  getItem :async function(id: number){
    try {
      return item;
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItem');
    }          
  },
  */
  /**************************************
   * addProjectMember
   * 
   * params : any args
   *
   * return :
   **************************************/ 
  addProjectMember :async function(args: any){
    try {
      console.log( args);
      const user: any = await LibUser.getItem(args);
console.log( user);
      if(user === null){
        throw new Error('Error , user nothing');
      }
      const client = LibPg.getClient();
      let text = `
      INSERT INTO public."ProjectMember" ("projectId", "userId", "createdAt", "updatedAt")
      VALUES (
        $1, $2, current_timestamp, current_timestamp 
      ) RETURNING *
      `;
      const values = [
        args.projectId,
        user.id,
      ];      
      let result = await client.query(text, values);
      client.end();
      result = result.rows[0];
console.log(result);
//      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , addProjectMember: '+ err);
    }          
  },
  /**************************************
   * deleteProjectMember
   * 
   * params : any args
   *
   * return :
   **************************************/  
  deleteProjectMember :async function(args: any)
  {
    try {
//console.log(args);
      const client = LibPg.getClient();
      let text = `
      DELETE FROM public."ProjectMember" WHERE id = $1
       RETURNING *
      `;
      const values = [
        Number(args.id)
      ];      
      let res = await client.query(text, values);
      client.end();
      const result = res.rows[0];
      console.log(result);
console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , deleteProjectMember,' + err);
    }          
  },             
}
