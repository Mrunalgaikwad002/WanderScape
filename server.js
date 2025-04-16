import express from "express";
import 'dotenv/config';
import userModel from "./model/userSchema.js";
import connectToDb from "./config/db.js";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "./middleware/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import registerrouter from "./routes/registerRoutes.js";
import loginrouter from "./routes/loginRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import mongoose from "mongoose";

const app = express();

// Security middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10kb' })); // Limit body size
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Connect to database
connectToDb();

const port = process.env.PORT || 5000;

// Routes
app.get("/", (req, res) => {
  res.json({ status: "success", message: "Server is running" });
});

app.get('/home', auth, (req, res) => {
  res.json({ status: "success", message: "Welcome to protected route" });
});

// Add health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    const dbState = mongoose.connection.readyState;
    const dbStatus = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting"
    };

    res.json({
      status: "success",
      message: "Health check passed",
      timestamp: new Date(),
      database: {
        state: dbStatus[dbState],
        host: mongoose.connection.host
      },
      memory: {
        heapUsed: process.memoryUsage().heapUsed / 1024 / 1024,
        heapTotal: process.memoryUsage().heapTotal / 1024 / 1024
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Health check failed",
      error: error.message
    });
  }
});

// API routes
app.use('/register', registerrouter);
app.use('/login', loginrouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// app.post("/register",  async (req, res) => {
//   console.log('pehle me yaha hu')
//   const { name, email, password, confirmpassword } = req.body;
//   const userExist = await userModel.findOne({ email });
//   if (userExist) {
//     return res.status(400).json({ error: "Email already exists" });
//   }
// console.log('i am here ')
// const hash_password=bcrypt.hashSync(password, 10)
// const user = await userModel.create({name, password:hash_password, email});
// await user.save();

// const token=jwt.sign({_userId:user._Id},secretKey,{expiresIn:"1h"});
// console.log(token)

 
//     res.send({message:"Success",
//       data : user
//     })

// });



// app.put("/register/update/:id",async (req,res)=>{
//   const itemId=req.params.id
//   const updatedId=req.body
//   const userUpdate=await userModel.findByIdAndUpdate({_id:itemId},updatedId,{new:true})
//   if(userUpdate){
//     res.send({message:"User Updated Successfully"})
//   }
//   else{
//     res.send({message:"User not updated Successfully"})
//   }
// })