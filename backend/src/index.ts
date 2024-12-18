
import express from 'express';
import { Router } from 'express';
const cors = require('cors');
const app = express();
app.use(express.json());
import authRouter from './routes/auth';
import contentRouter from './routes/content';
import shareRouter from './routes/share';
app.use(cors());

app.use('/content',contentRouter);
app.use('/auth', authRouter);
app.use('/share',shareRouter);
app.get('/',(req,res)=>{
     res.json({message:'Hello World'});
})
app.listen(3000,()=>{
     console.log('Server is running on port 3000');
})
export default app;