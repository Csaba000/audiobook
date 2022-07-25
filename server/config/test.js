import mongoose from 'mongoose';
import * as dotenv from 'dotenv' 
dotenv.config({ path: '../.env'})
import express from 'express'

import {MongoClient} from 'mongodb';




const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const connectionString= process.env.MONGODB_CONNECTION_STRING;

function toArray(iterator) {
  return new Promise((resolve, reject) => {
    iterator.toArray((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}


async function main() {
	// we'll add code here soon
    const uri = `mongodb+srv://${user}:${password}${connectionString}`;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        
            const databasesList = await client.db().admin().listDatabases();
            console.log("Databases:");
            databasesList.databases.forEach(db => console.log(` - ${db.name}`));
            const collections = Object.keys(mongoose.connection.collections);
            console.log("Collections:",collections);
            console.log(client.collections);
    
        } catch (e) {
        console.error(e);
    }finally {
        await client.close();
    }


}

main().catch(console.error);
