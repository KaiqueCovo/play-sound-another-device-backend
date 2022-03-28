import { Request, Response, Router } from 'express';
import path from 'path';
import playSound from 'play-sound';

const musicsJSON = require('../data/musics.json');

const playMusicRouter = Router();

interface MusicPlaying {
  music: string;
  stop: () => void
}

const musicsPlaying: MusicPlaying[] = []

playMusicRouter.post('/play', async (req: Request, res: Response) => {
  const { music } = req.body
  const musicPath = path.join(__dirname, "..", "musics", `${music}.mp3`);
  
  try {
    res.json({
      name: music,
      playing: true,
    })

    const sound = playSound({}).play(musicPath, function(err){
      if (err && !err.killed) throw err
    })

    musicsPlaying.push({
      music: musicPath,
      stop: () => sound.kill()
    })
  } catch (error) {
    res.json({
      name: music,
      playing: false,
      error
    })
  }
})

playMusicRouter.get('/stop', async (req: Request, res: Response) => {
  const { name } = req.query

  try {
    musicsPlaying[0].stop()

    return res.json({
      name,
      stop: true,
    })

  } catch (error: any) {
    return res.json({
      name,
      stop: false,
      error
    })
  }
  
})

playMusicRouter.get('/list', async (_, res: Response) => {
  res.json(musicsJSON)
});


export { playMusicRouter }