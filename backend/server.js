require ('dotenv').config();


const express = require ("express");
const mongoose = require('mongoose');

const workoutRouter = require ("./routes/workouts");
const { error } = require('console');
// express app
const app = express();

// middleware

app.use(express.json());
app.use((req,res,next)=>{
  console.log(req.path,req.method);
  next();
})

// routes
app.use("/api/workouts",workoutRouter);

// connect to db

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  // listen for request
app.listen(process.env.PORT,()=>{
  console.log("Connect to DB & listening on Port",process.env.PORT);
})
})
.catch((error)=>{
console.log(error);
})



