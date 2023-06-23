import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/ProductRouter.js';
import cors from 'cors';
import authRouter from './routers/AuthRouter.js';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/error-middleware.js';

const PORT = 5000;
const DB_URL = `mongodb+srv://user:user@cluster0.muovxrb.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  }));
app.use('/', productRouter);
app.use('/auth', authRouter);
app.use(errorMiddleware);

async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
startApp()