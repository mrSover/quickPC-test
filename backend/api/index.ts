import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import eventsController from './controllers/events-controller';
import cors from "cors"

const app = express();
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 5000
const mongoURL = process.env.DB_URL;
app.use(cors({
  origin: "https://event-board-three.vercel.app",
  credentials: true
}))
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/events', (req: Request, res: Response) => {
  eventsController.getEvents(req, res)
});

app.post('/events', (req: Request, res: Response) => {
  eventsController.addEvent(req, res)
});
app.post('/events/:id/registration', (req: Request, res: Response) => {
  eventsController.addParticipant(req, res)
});
const start = async () => {
  try {
    if (!mongoURL) {
      throw new Error('DB_URL is not defined in the environment variables');
    }
    await mongoose.connect(mongoURL)
    app.listen(PORT, () => console.log("working on " + PORT + " port"))
    console.log("connected to db")
  } catch (error) {
    console.log(error)
  }
}
start()
module.exports = app;