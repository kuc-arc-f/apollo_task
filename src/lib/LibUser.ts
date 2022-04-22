const { PrismaClient } = require('@prisma/client')
import LibCsrf from "./LibCsrf"
import logger from './logger'

export default {
  getItems :async function(){
    try {
      console.log("tasks");
    } catch (err) {
      console.error(err);
//      logger.error( "Error ,LibTask.getItems: "+ err);
      throw new Error('Error , getItems');
    }          
  },    
  getItem :async function(args: any){
    try {
console.log(args);
      const prisma = new PrismaClient();
      let item = null;
      let items = await prisma.user.findMany({
        where: { firebaseUid: args.firebaseUid },
      });        
      await prisma.$disconnect()
      if(items.length > 0){
        item = items[0];
      }
console.log("len=", items.length);
console.log(item);
      return item;
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItem');
    }          
  },
  addUser :async function(args: any){
    try {
      console.log( args); 
      const prisma = new PrismaClient();
      const result = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          firebaseUid: args.firebaseUid,
        }
      }) 
      await prisma.$disconnect()
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
      const valid = await LibCsrf.validToken(args);
      if(valid === false){
        throw new Error('Error , validToken');
      }
      const prisma = new PrismaClient();
      const result = await prisma.task.update({
        where: { id: args.id},
        data: { title: args.title },
      })               
      await prisma.$disconnect()
console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , updateTask,'+ err);
    }          
  },  
  deleteTask :async function(args: any){
    try {
console.log(args);
      const valid = await LibCsrf.validToken(args);
      if(valid === false){
        throw new Error('Error , validToken');
      }
      const prisma = new PrismaClient();
      const result = await prisma.task.delete({
        where: { id: Number(args.id) },
      })                   
      await prisma.$disconnect()
console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , deleteTask,' + err);
    }          
  },             
}
