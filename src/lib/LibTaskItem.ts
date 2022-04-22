const { PrismaClient } = require('@prisma/client')
import moment from 'moment';

import LibUser from "./LibUser"
const TIME_INIT_STR = "T00:00:00.000Z"

export default {
  getItems :async function(args: any){
    try {
console.log(args);
/*
      const user: any = await LibUser.getItem(args);
      if(user === null){
        throw new Error('Error , user nothing');
      }
*/
      const prisma = new PrismaClient()
      const items = await prisma.task.findMany({
        where: { projectId: args.projectId },
//        where: { userId: user.id },
//        orderBy: { id: 'desc',},
        orderBy: { complete: 'asc',},
        //complete
      })
      await prisma.$disconnect()
      return items      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems');
    }          
  },    
  getItem :async function(id: number){
    try {
      // 
      const prisma = new PrismaClient();
      let item = await prisma.task.findUnique({
        where: { id: id },
      });        
      await prisma.$disconnect()
//console.log(item);
      return item;
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItem');
    }          
  },
  addTaskItem :async function(args: any){
    try {
      console.log( args);
      const user: any = await LibUser.getItem(args);
//console.log( user);
      if(user === null){
        throw new Error('Error , user nothing');
      }
//      const completeDate = new Date(args.complete + "-01" + TIME_INIT_STR) ;
      const completeDate = new Date(args.complete + TIME_INIT_STR) ;

      const prisma = new PrismaClient();
      const result = await prisma.task.create({
        data: {
          projectId: args.projectId,
          title: args.title,
          content: args.content,
//          complete: new Date(),
          complete: completeDate,
          status: args.status,
          userId: user.id,
        }
      }) 
      await prisma.$disconnect()
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , addTaskItem: '+ err);
    }          
  },
  updateTaskItem :async function(args: any){
    try {
//console.log(args);

      const completeDate = new Date(args.complete + TIME_INIT_STR) ;
      const prisma = new PrismaClient();
      const result = await prisma.task.update({
        where: { id: args.id},
        data: {
          title: args.title,
          content: args.content,
          status: args.status,
          complete: completeDate,
        },
      })               
      await prisma.$disconnect()
console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , updateTaskItem,'+ err);
    }          
  },  
  deleteTaskItem :async function(args: any){
    try {
console.log(args);
      const prisma = new PrismaClient();
      const result = await prisma.task.delete({
        where: { id: Number(args.id) },
      })                   
      await prisma.$disconnect()
console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , deleteTaskItem,' + err);
    }          
  },             
}
