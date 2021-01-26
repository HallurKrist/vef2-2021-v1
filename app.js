/* Keyrt með node app.js

Keyrir vekefni 1 í vefforritun */
import express from 'express';
// eslint vildi ekki að það væri .js ending
import { router } from './src/videos.js'; // eslint-disable-line

const app = express();

// Setur þannig að app geti sótt úr public möppunni
// Og lætur app vita að verið er að nota ejs
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/', router);

// Síða fannst ekki
function notFoundHandler(req, res) {
  res.status(404).render('error', { errorNr: 404 });
}

// Meðhöndlar villur
function errorHandler(err, req, res) {
  res.status(500).render('error', { errorNr: 500 });
}

// Ef komist hingað í ferlinu þá er villa
app.use(notFoundHandler);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  // eslint vil ekki hafa console skipanir
  console.log(`Server running at http://${hostname}:${port}/`); // eslint-disable-line
});
