import connectDB from "./db/index.js";
import {app} from "./app.js";
import dotenv, { config } from "dotenv"
dotenv.config({
    path: './.env'
})
 
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port:${process.env.PORT}`);
    });
})
.catch((err) => {
console.log("Mongo db connection faild !!!" , err);
})


// require('dotenv').config({path: './env'});

//  change the packege.json file 
// "scripts": {
//     "dev": nodemon -r dotenv/config --experimental-json-modules src/indexedDB.js"
// }

// import mongoose, { connect } from "mongoose";
// import {DB_NAME} from "./constant"
// import express  from "express";
// const app = express()

// (async()=>{
//     try {
//         await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`)

//         // FOR Express conection
//         app.on("error" , (error) => {
//             console.log("ERROR:" ,error);
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`Your Port is ${process.env.PORT}`);
//         })

        
//     } catch (error) {
//         console.error("ERORR:" , error)
//         throw err
        
//     }
// })()