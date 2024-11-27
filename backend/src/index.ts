
import express from 'express';
import { Router } from 'express';
const app = express();
app.use(express.json());
import authRouter from './routes/auth';
import contentRouter from './routes/content';

app.use('/content',contentRouter);
app.use('/auth', authRouter);
app.listen(3000,()=>{
     console.log('Server is running on port 3000');
})
export default app;