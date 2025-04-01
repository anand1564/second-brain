import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const express = require('express');
const jwt=require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const prisma = new PrismaClient();

const router = express.Router();

const CLIENT_ID = '230324946099-6pnlga6ijfgiha6h6cen6qai12qidh62.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

// router.post('/google/callback', async (req: Request, res: Response) => {
//   const { token } = req.body;
  
//   if (!token) {
//       return res.status(400).json({ error: "Token is missing" });
//   }

//   console.log("Received token from frontend:", token); // ✅ Log received token

//   try {
//       const ticket = await client.verifyIdToken({
//           idToken: token,
//           audience: CLIENT_ID, // Make sure this matches exactly
//       });

//       const payload = ticket.getPayload();
//       console.log("Verified Payload:", payload); // ✅ Log payload

//       if (!payload) {
//           return res.status(401).json({ error: "Invalid token" });
//       }

//       const { sub: userId, email, name } = payload;

//       console.log('User authenticated:', { userId, email, name });

//       // Upsert user into Prisma database
//       const upsertUser = await prisma.user.upsert({
//           where: { email },
//           update: { name },
//           create: { email, name, googleId: userId },
//       });

//       // ✅ Generate JWT
//       const jwtToken = jwt.sign({ userId }, 'myjwtsecret', { expiresIn: "7d" });

//       return res.status(200).json({ userId, email, name, token: jwtToken });
//   } catch (error) {
//       console.error("Error verifying Google token:", error);
//       return res.status(401).json({ error: "Authentication failed" });
//   }
// });
// router.post('/google/callback', async (req:Request, res:Response) => {
//   const { token } = req.body;

//   if (!token) {
//     return res.status(400).json({ error: "Token is missing" });
//   }

//   console.log("Received token:", token);

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     console.log("Verified Payload:", payload);

//     const userId = payload['sub']; 
//     const email = payload['email'];
//     const name = payload['name'];
//     const upsertUser = await prisma.user.upsert({
//       where: { email },
//       update: { name },
//       create: { email, name, googleId: userId },
//   });

//     console.log('User authenticated:', { userId, email, name });

//     return res.status(200).json({userId, email, name});
//   } catch (error) {
//     console.error("Error verifying Google token:", error);
//     return res.status(401).json({ error: "Authentication failed" });
//   }
// });
const SECRET_KEY="123123";

router.post('/signup', async(req:Request,res:Response)=>{
  const {email,password,name} = req.body;
  try{
    const payload = {
      email: email,
      password: password
    }
    const response = await prisma.user.create({
      data:{
        name: name,
        email: email,
        password: password
      }
    })
    if(response){
      const jwtToken = jwt.sign(payload,SECRET_KEY);
      res.status(200).json({message:"Signup successful",token:jwtToken});
    }else{
      return res.status(401).json({ error: "Signup failed" });
    }
  }catch(error){
    console.error("Error signing up:", error);
    return res.status(401).json({ error: "Signup failed" });
  }
})

router.post('/signin', async(req: Request,res:Response)=>{
  const {email,password} = req.body;
  try{
    const user = await prisma.user.findUnique({
      where:{
        email: email,
        password: password
      }
    })
    if(user){
      const payload = {
        id: user.id,
        email: email,
        password: password
      }
      const jwtToken = jwt.sign(payload,SECRET_KEY,{expiresIn:"7d"});
      res.status(200).json({message:"Signin successful",token:jwtToken,
        userId: user.id
      });
    }else{
      return res.status(401).json({ error: "Signin failed" });
    }
  }catch(err){
    console.error("Error signing in:", err);
    return res.status(401).json({ error: "Signin failed" });
  }
})


export default router;
