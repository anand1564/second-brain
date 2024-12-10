
import { Router } from "express";
const router = Router();

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function generateLink(length:number) {
     let result = '';
     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     const charactersLength = characters.length;
     let counter = 0;
     while (counter < length) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
       counter += 1;
     }
     return result;
 }


router.post('/create/:id',async(req,res)=>{
     const user_id=Number(req.params.id);
     const shareableLink = generateLink(10);
     try{
          const hash=await prisma.user.update({
               where:{
                    id:user_id
               },
               data:{
                    link:shareableLink
               }
          })
          res.json({message:'Link created successfully'});
     }catch(error){
          res.status(400).json({error:'Error creating link'});
     }
})
// router.get('/share/:link', async(req,res)=>{
//      const shareableLink = req.params.link;
//      try{ 

//           const linkData = await prisma.user.findUnique({
//                where:{
//                     link: shareableLink,
//                }
//           })
//           return res.json(linkData);
//      }
// })
export default router;