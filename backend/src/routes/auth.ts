
import {z} from 'zod';
const User=z.object({
     username:z.string().min(3).max(10),
     password:z.string().regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"))
})
import { Router } from "express";
const router=Router();

router.post('/signup',async (req,res)=>{
     const userObj = {
          username: req.body.username as string,
          password: req.body.password as string
     }
     try {
          const user=User.parse(userObj);
          res.json(user);
     } catch (error) {
          res.send('Error creating user');
     }
})

export default router;