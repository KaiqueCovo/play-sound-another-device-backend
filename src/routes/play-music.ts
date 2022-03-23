import { Router } from 'express';
import path from 'path';
import sound from 'sound-play';
const musicsJSON = require('../data/musics.json');

const playMusicRouter = Router();

const musicsPlaying: any[] = []

playMusicRouter.post('/', async (req, res) => {
  const { music } = req.body
  const musicPath = path.join(__dirname, "..", "musics", `${music}.mp3`);
  
  try {
    res.json({
      name: music,
      playing: true,
    })

    musicsPlaying.push(music)
    console.log(musicsPlaying)

    await sound.play(musicPath);
  } catch (error) {
    console.log('error', error)
    res.json({
      name: music,
      playing: false,
      error
    })
  }
})

playMusicRouter.get('/musics', async (req, res) => res.json(musicsJSON));


export { playMusicRouter }