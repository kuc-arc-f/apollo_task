import moment from 'moment';
const { PrismaClient } = require('@prisma/client')
import csrf from 'csrf';
const tokens = new csrf();
import Config from '../../config';

export default {
  getToken :async function(){
    try {
    } catch (err) {
        console.error(err);
        throw new Error('Error , getToken');
    }          
  },
  deleteOldToken :async function(){
    try {  
//console.log(Config.DELETE_TOKEN_EXPIRE_MIN);
      const prisma = new PrismaClient();
      // select , token
      const befMin = Config.DELETE_TOKEN_EXPIRE_MIN * (-1);
//      const befMin = 1 * (-1);
      const dt = moment().add( befMin, 'minutes').toISOString();
//console.log(dt, befMin);
/*
      const items = await prisma.token.findMany({
        where: {
          expire_datetime: {
            lt:  new Date(dt)
          },
        },
      });
console.log(items);
console.log("delete-len=", items.length);
*/
      const deleteItem = await prisma.token.deleteMany({
        where: {
          expire_datetime: {
            lt:  new Date(dt)
          },
        },
      })
// console.log(deleteItem);
      await prisma.$disconnect()
    } catch (err) {
        console.error(err);
        throw new Error('Error , deleteOldToken' + err);
    }          
  },  
  validToken :async function(args: any){
    try {
console.log(args);
      let ret: boolean = false;
      const prisma = new PrismaClient()
      const items = await prisma.token.findMany({
        where: { token: args.token },
      })
      await prisma.$disconnect();
      if(items.length < 1){
        throw new Error('Error , token nothing');
      }
      //csrf
      const item = items[0];
//      console.log(item);
      console.log("len=", items.length);
      //if(tokens.verify(item.secret, args.token) === false)
      if(item.token !== args.token){
        throw new Error('Invalid Token');
      }      
      ret = true;
      return ret;
    } catch (err) {
      console.error(err);
      throw new Error('Error validToken : ' + err);
    }          
  },           
  addToken :async function(args: any){
    try {
console.log(args);
      // delete-OLD
      await this.deleteOldToken();
      const prisma = new PrismaClient();
      const deleteItem = await prisma.token.deleteMany({
        where: {
          token: args.token ,
        },
      })
//console.log(deleteItem);
      //add
      let result = await prisma.token.create({
        data: {
          token: args.token,
          secret: '',
          expire_datetime: new Date(),
          userId: 0
        }
      }) 
//    console.log(result);
//console.log("len=", items.length);
      await prisma.$disconnect()
      return args.token;
    } catch (err) {
      console.error(err);
      throw new Error('Error addToken : ' + err);
    }          
  },           
}
