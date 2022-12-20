const express=require('express');
const env=require('dotenv').config();
const app=express();
//middlewares
app.use(express.json());
const port=process.env.PORT || 8000;
//mongo db connection 
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose
.connect(process.env.DATABASE,{
 useNewUrlParser: true,
// useUnifiedToplogy:true,
// useCreateIndex:true
})
.then(() => {
console.log('connected to db');
 })
.catch((err) => {
console.log(err.message);
 });
app.listen(port,()=>{
console.log(`Server is running on port `+port);
});