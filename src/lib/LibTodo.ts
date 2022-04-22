const { PrismaClient } = require('@prisma/client')
import LibCsrf from "./LibCsrf"
import logger from './logger'

export default {
  getItems :async function(args: any){
    try {
console.log(args.userId);
      const prisma = new PrismaClient()
      const items = await prisma.todo.findMany({
        where: { userId: args.userId },
        orderBy: { id: 'desc',},
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
      const prisma = new PrismaClient();
      let item = await prisma.todo.findUnique({
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
  addTodo :async function(args: any){
    try {
      console.log( args); 
      const prisma = new PrismaClient();
      const result = await prisma.todo.create({
        data: {
          title: args.title,
          content: args.content,
          complete: args.complete,
          userId: args.userId,
        }
      }) 
      await prisma.$disconnect()
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , addTodo: '+ err);
    }          
  },
  updateTodo :async function(args: any){
    try {
console.log(args);
      const prisma = new PrismaClient();
      const result = await prisma.todo.update({
        where: { id: args.id},
        data: {
          title: args.title,
          content: args.content,
          complete: args.complete,
        },
      })               
      await prisma.$disconnect()
console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , updateTodo,'+ err);
    }          
  },
  updateCompleteTodo :async function(args: any){
    try {
console.log(args);
      const prisma = new PrismaClient();
      const result = await prisma.todo.update({
        where: { id: args.id},
        data: {
          complete: args.complete,
        },
      })               
      await prisma.$disconnect()
console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , updateCompleteTodo,'+ err);
    }          
  },    
  deleteTodo :async function(args: any){
    try {
console.log(args);
      const prisma = new PrismaClient();
      const result = await prisma.todo.delete({
        where: { id: Number(args.id) },
      })                   
      await prisma.$disconnect()
console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , deleteTodo,' + err);
    }          
  },             
}
