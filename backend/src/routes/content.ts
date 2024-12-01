

import { Router } from "express";
const router = Router();
import { PrismaClient } from '@prisma/client';
import { number } from "zod";
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
router.get('/:id',async(req,res)=>{
     const id=Number(req.query.id);
     try{
          const cont=await prisma.content.findMany({
               where:{
                    id:1,
               }
          })
          res.json(cont);
     }catch(error){
          res.status(400).json({error:'Error fetching content'});
     }
})

export default router;