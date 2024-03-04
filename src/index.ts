import express from "express";
import  { Express} from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user";
import noteRoute from "./routes/notes";
import mongoose from "mongoose";
import cors from 'cors'
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())

// middleware
app.use('/api/notes', noteRoute)
app.use('/api/user', userRoute)

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server listening on port ${PORT}`)
        })
    }).catch(err => console.log('connection error', err))
