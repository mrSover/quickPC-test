// import 'dotenv/config';
// import express, { Express } from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import mongoose from 'mongoose';
// import router from '../api/router/index';
// import errorMiddleware from '../api/middlewares/error-middleware';

// const PORT: number = Number(process.env.PORT) || 5000;
// const app: Express = express();

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors());
// app.use('/api', router);
// app.use(errorMiddleware);

// const start = async () => {
//     try {
//         await mongoose.connect(process.env.DB_URL as string);
//         app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
//     } catch (e) {
//         console.error(e);
//     }
// };

// start();


import express, { Express, Request, Response } from 'express';

const PORT: number = Number(process.env.PORT) || 5000;
const app = express();

app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));

// const start = async () => {
//   try {
//   } catch (e) {
//     console.error(e);
//   }
// };

//  start();
module.exports = app;