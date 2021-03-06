import express from 'express';
import fs from 'fs';

// eslint vil að ég exporta meira en einum hlut.
export const router = express.Router(); // eslint-disable-line

// Forsíða (index)
router.get('/', (req, res) => {
  fs.readFile('videos.json', (err, data) => {
    if (err) {
      res.render('error', { errorNr: err.errno });
    } else {
      res.render('index', { title: 'Videos', data: JSON.parse(data), timeAgo: 0 });
    }
  });
});

// Myndbandarsíða
router.get('/video:vId/', (req, res, next) => {
  fs.readFile('videos.json', (err, data) => {
    if (err) {
      res.render('error', { errorNr: err.errno });
    } else {
      const allVideos = JSON.parse(data).videos;
      if (req.params.vId > 0 && req.params.vId <= allVideos.length) {
        const theVideo = allVideos[req.params.vId - 1];
        res.render('video', { title: theVideo.title, data: theVideo });
      } else {
        next();
      }
    }
  });
});
