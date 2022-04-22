const { PrismaClient } = require('@prisma/client')
//import LibCsrf from "./LibCsrf"
//import logger from './logger'
import LibUser from "./LibUser"

export default {
  getItems :async function(args: any){
    try {
console.log(args);
//
      const user: any = await LibUser.getItem(args);
      console.log( user);
      if(user === null){
        throw new Error('Error , user nothing');
      }
/*
*/
      const prisma = new PrismaClient()
      const items = await prisma.project.findMany({
        where: { userId: user.id },
        orderBy: { id: 'desc',},
      })
      await prisma.$disconnect()
console.log(items);
      return items      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems: ' + err);
    }          
  },    
  getItem :async function(id: number){
    try {

      const prisma = new PrismaClient();
      let item = await prisma.project.findUnique({
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
  addProject :async function(args: any){
    try {
      console.log( args);
      const invite = this.getInviteCode();
//console.log( invite);
      const user: any = await LibUser.getItem(args);
console.log( user);
      if(user === null){
        throw new Error('Error , user nothing');
      }
      const prisma = new PrismaClient();
      const result = await prisma.project.create({
        data: {
          name: args.name,
          userId: user.id,
          inveiteCode: invite,
        }
      }) 
      await prisma.$disconnect()
//      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , addProject: '+ err);
    }          
  },
  updateProject :async function(args: any){
    try {
      console.log(args);
      const user: any = await LibUser.getItem(args);
      console.log( user);
      if(user === null){
        throw new Error('Error , user nothing');
      }
      const prisma = new PrismaClient();
      const result = await prisma.project.update({
        where: { id: args.id},
        data: {
          name: args.name,
        },
      })               
      await prisma.$disconnect()
console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , updateProject ,'+ err);
    }          
  },
  deleteProject :async function(args: any){
    try {
console.log(args);
      const prisma = new PrismaClient();
      const result = await prisma.project.delete({
        where: { id: Number(args.id) },
      })                   
      await prisma.$disconnect()
console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , deleteProject,' + err);
    }          
  },
  getRandomStr :function(){
    const s = "0123456789"
    const random = Math.floor( Math.random()* s.length );
    if(random >= s.length){ throw new Error('Error , getRandomStr'); }
   //    console.log(s.length ,random )
    return s[random]    
  },
  getInviteCode :function(){
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
