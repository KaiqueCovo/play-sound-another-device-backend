import { Router } from 'express';
import path from 'path';
import sound from 'sound-play';
const musicsJSON = require('../data/musics.json');

const playMusicRouter = Router();

playMusicRouter.post('/', async (req, res) => {

  const { music } = req.body

  const musicPath = path.join(__dirname, "..", "musics", `${music}.mp3`);


  try {
    await sound.play(musicPath);

    console.log('FIIIIM')

  } catch (error) {
    return res.json({
      name: music,
      playing: false,
      error
    })
  }
})

playMusicRouter.get('/musics', async (req, res) => res.json(musicsJSON));


export { playMusicRouter }