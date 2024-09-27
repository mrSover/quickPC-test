import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());

const mongoURI = process.env.DB_URL;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});


const start = async () => {
  try {
    if (!mongoURI) {
      throw new Error('DB_URL is not defined in the environment variables');
    }
    await mongoose.connect(mongoURI)
    console.log("connected to db")
  } catch (error) {
    console.log(error)
  }
}
start()
module.exports = app;