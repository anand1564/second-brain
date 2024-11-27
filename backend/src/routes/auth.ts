
import {z} from 'zod';
const User=z.object({
     username:z.string().min(3).max(10),
     password:z.string().regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"))
})
import { Router } from "express";
const router=Router();
import { PrismaClient,Prisma } from '@prisma/client';
const prisma = new PrismaClient();

router.post('/signup',async (req,res)=>{
     const userObj = {
          username: req.body.username as string,
          password: req.body.password as string
     }
     try {
          const user=User.parse(userObj);
          const newUser = await prisma.user.create({
               data:{
                    username: user.username,
                    password: user.password
               }
          })
          res.json(newUser);
     } catch (error) {
          res.send('Error creating user');
     }
})
router.post('/login',async(req,res)=>{
     const userObj = {
          username: req.body.username as string,
          password: req.body.password as string
     }
     try{
          const loginUser = await prisma.user.findFirst({
               where:{
                    username: userObj.username,
                    password: userObj.password
               }
          })
          if(loginUser){
               res.json(userObj);
          }else{
               res.send('Invalid username or password');
          }
     }catch(error){
          res.send('Error logging in');
     }
})


export default router;