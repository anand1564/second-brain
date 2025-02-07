
import { z } from 'zod';
const userInputSchema = z.object({
     username: z.string().min(3).max(10),
     password: z.string().min(8),
   });
   

import { Request, Response, Router } from "express";
const router=Router();
import { PrismaClient,Prisma, User } from '@prisma/client';
const prisma = new PrismaClient();
router.post('/signup', async (req: Request, res: Response) => {
     try {
       const userData = userInputSchema.parse(req.body);
   
       const newUser = await prisma.user.create({
         data: userData,
       });
   
       return res.status(201).json({ userId: newUser.id });
     } catch (error) {
       return res.status(400).json({ error: 'Invalid input', details: error });
     }
});
   
router.post('/login', async (req: Request, res: Response) => {
     const { username, password } = req.body;
   
     try {
       const user = await prisma.user.findFirst({
         where: { username, password },
       });
   
       if (!user) {
         return res.status(401).json({ error: 'Invalid username or password' });
       }
   
       return res.status(200).json({ message: 'Login successful', user });
     } catch (error) {
       return res.status(500).json({ error: 'Internal server error' });
     }
   });
   


export default router;