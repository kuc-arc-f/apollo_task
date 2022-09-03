import { addAbortSignal } from "stream";
require('dotenv').config();

const { Pool, Client } = require('pg')
//
const LibPg = {
  getPool: function(){
    try{
      const pool = new Pool({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT,
      });
      return pool;    
    } catch (e) {
      console.error(e);
      throw new Error('Error , getPool');
    }    
  },
  getClient: function(){
    try{
      const client = new Client({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT,
      })
      client.connect();
      return client;      
    } catch (err) {
      console.log(err);
      throw new Error('Error, getClient');
    }
  },

}
export default LibPg;
