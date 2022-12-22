const express=require('express');
const env=require('dotenv').config();
const app=express();
const mongoose = require('mongoose');
const cors=require('cors');
app.use(cors());
const cookieParser=require('cookie-parser');
app.use(cookieParser());
mongoose.set('strictQuery', true);
//middlewares
app.use(express.json());
const port=process.env.PORT || 8000;
//routes(Amey)
app.use('/api',require('./routes/auth'));
//routes(Shubham)
app.use('/api',require('./routes/users'));
app.use('/api',require('./routes/events'));
//mongo db connection 

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
