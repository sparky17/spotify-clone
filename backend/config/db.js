const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const connectDB = async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log('\x1b[32m%s\x1b[0m',`Mongo db is connected at ${process.env.MONGO_URI}`,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
       }catch(error){
            console.error('\x1b[31m%s\x1b[0m', `Error: ${error.message}`);
       }
}   
module.exports=connectDB;