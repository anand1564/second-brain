import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const prisma = new PrismaClient();

const router = express.Router();

const CLIENT_ID = '';
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
router.post('/google/callback', async (req:Request, res:Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is missing" });
  }

  console.log("Received token:", token);

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Verified Payload:", payload);

    const userId = payload['sub']; 
    const email = payload['email'];
    const name = payload['name'];
    const upsertUser = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: { email, name, googleId: userId },
  });

    console.log('User authenticated:', { userId, email, name });

    return res.status(200).json({userId, email, name});
  } catch (error) {
    console.error("Error verifying Google token:", error);
    return res.status(401).json({ error: "Authentication failed" });
  }
});


export default router;
