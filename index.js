const express=require('express');
const env=require('dotenv');
env.config({path:'./.env'});
const app=express();
// const authRoute=require('./routes/auth');
const userRoute=require('./routes/users');
const eventRoute=require('./routes/events');
const cors=require('cors');
app.use(cors());

const cookieParser=require('cookie-parser');
app.use(cookieParser());


//middlewares
app.use(express.json());
//connection
require('./db/conn')
const port=process.env.PORT || 8000;
//routes(Amey)
// app.use('/api',authRoute);
//routes(Shubham)
app.use('/api',userRoute);
app.use('/api',eventRoute);
//mongo db connection 


app.listen(port,()=>{
console.log(`Server is running on port `+port);
});
