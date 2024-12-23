

import { Router } from "express";
const router = Router();
import { PrismaClient } from '@prisma/client';
import { number } from "zod";
import { userInfo } from "os";
const prisma = new PrismaClient();

router.post('/create/:id/', async(req,res)=>{
     const user_id=Number(req.params.id);
     const {title,description,type} = req.body;
     try{
          if(type=='Youtube' || type=='Tweet'){
               const link=req.body.link;
               const cont=await prisma.content.create({
                    data:{
                         title,
                         description,
                         type,
                         link,
                         userId:user_id,
                    }
               })
               res.json(cont);
          }
     }catch(error){
          res.status(400).json({error:'Error creating content'});
     }
})
router.get('/:id',async(req,res)=>{
     const id=Number(req.query.id);
     try{
          const cont=await prisma.content.findMany({
               where:{
                    userId:1
               }
          })
          res.json(cont);
     }catch(error){
          res.status(400).json({error:'Error fetching content'});
     }
})

export default router;