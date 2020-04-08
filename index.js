const axios = require('axios');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());

const port = 8002;
app.listen(port, () => console.log(`http://localhost:${port}`));

// Static assets
app.use('/', express.static('build'));

// Make all requests cached for 5 minutes on clients to prevent rate-limiting
const cacheAge = 60 * 5;

// POE proxy to override cookies and bypass CORS
app.get('/poe', (req, res) => {
  const { league, user, poesessid } = req.query;
  if (!league || !user || !poesessid) {
    res.sendStatus(400);
    return;
  }

  let promises = [];
  let data = [];

  getTab(user, league, poesessid, 0)
    .then((response) => {
      // Copy 1st tab into the final data
      Array.prototype.push.apply(data, response.data.items);

      // Go through all additional tabs, add results as they come in
      let i = 1;
      while (i < response.data.numTabs) {
        promises.push(getTab(user, league, poesessid, i).then((res) => Array.prototype.push.apply(data, res.data.items)));
        i++;
      }

      // Wait for all tabs, then send response as a single payload
      Promise.all(promises)
        .then(() => {
          res.setHeader('Cache-Control', `public, max-age=${cacheAge}`);
          res.send(data);
        })
        .catch((err) => {
          res.status(401);
          res.send(err);
        });
    })
    .catch((err) => {
      res.status(401);
      res.send(err);
    });
});

// Simple wrapper to return an axios request which bypasses CORS and sends along the auth cookie
function getTab(user, league, poesessid, i) {
  const url = `https://www.pathofexile.com/character-window/get-stash-items?league=${league}&tabIndex=${i}&accountName=${user}`;
  console.log(new Date().toLocaleString(), url);
  return axios.get(url, {
    headers: {
      authority: 'www.pathofexile.com',
      cookie: `POESESSID=${poesessid}`,
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
    },
  });
}
