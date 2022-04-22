const { PrismaClient } = require('@prisma/client')
import LibCsrf from "./LibCsrf"
import logger from './logger'
import LibUser from "./LibUser"

export default {
  getItems :async function(args: any){
    try {
console.log(args);
      const prisma = new PrismaClient()
      const items = await prisma.projectMember.findMany({
        where: { projectId: args.projectId },
        orderBy: { id: 'desc',},
      })
      await prisma.$disconnect()
      return items      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems: ' + err);
    }          
  },  
  //   
  countProjectMembers :async function(args: any){
    try {
console.log(args);
      const user: any = await LibUser.getItem(args);
//console.log( user);
      if(user === null){
        throw new Error('Error , user nothing');
      }
      const prisma = new PrismaClient()
      const count = await prisma.projectMember.count({
        where: {
          projectId: args.projectId , userId: user.id
        },
      })
      await prisma.$disconnect();
//console.log( count);
      return count;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , countProjectMembers: ' + err);
    }          
  },  
  getItem :async function(id: number){
    try {
      const prisma = new PrismaClient();
      let item = await prisma.projectMember.findUnique({
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
  addProjectMember :async function(args: any){
    try {
      console.log( args);
      const user: any = await LibUser.getItem(args);
console.log( user);
      if(user === null){
        throw new Error('Error , user nothing');
      }
      const prisma = new PrismaClient();
      const result = await prisma.projectMember.create({
        data: {
          projectId: args.projectId,
          userId: user.id,
        }
      }) 
      await prisma.$disconnect()
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , addProjectMember: '+ err);
    }          
  },
  updateProject :async function(args: any){
    try {
    } catch (err) {
      console.error(err);
      throw new Error('Error , updateProject ,'+ err);
    }          
  },
  deleteProjectMember :async function(args: any){
    try {
//console.log(args);
      const prisma = new PrismaClient();
      const result = await prisma.projectMember.delete({
        where: { id: Number(args.id) },
      })                   
      await prisma.$disconnect()
console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error , deleteProjectMember,' + err);
    }          
  },             
}
