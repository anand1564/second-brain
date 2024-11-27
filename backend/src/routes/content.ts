

import { Router } from "express";
const router = Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

router.post('/create',async(req,res)=>{
     const {title,description,userId,link} = req.body;
     const tag = req.body.tags;
     try{
          // if(!Array.isArray(tags)){
          //      return res.status(400).json({error:'Tags should be an array'});
          // }
          const newContent = await prisma.content.create({
               data:{
                    title,
                    description,
                    link,
                    userId,
                    // tags:{
                    //      connectOrCreate:tags.map((tag:string)=>({
                    //           where:{name:tag},
                    //           create:{name:tag}
                    //      })),
                    // },
                    tags:tag,
               },
          });
          res.status(201).json(newContent);
     }catch(error){
          res.status(400).json({error:'Error creating content'});
     }
});

export default router;