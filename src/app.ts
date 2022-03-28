import express from 'express';
import cors from 'cors';
import { playMusicRouter } from './routes/play-music';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/music', playMusicRouter);

export default app;