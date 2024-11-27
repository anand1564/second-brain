
import express from 'express';
import { Router } from 'express';
const app = express();
app.use(express.json());
import authRouter from './routes/auth';

app.use('/auth', authRouter);
app.listen(3000,()=>{
     console.log('Server is running on port 3000');
})
export default app;