const express = require('express');
const axios = require('axios');

const app = express();
const port = 9050;

app.listen(port, () => console.log(`http://localhost:${port}`));

// Static assets
app.use('/', express.static('build'));

// POE proxy to override cookies and bypass CORS
app.get('/poe', (req, res) => {
  const { league, user, cookie } = req.query;
  if (!league || !user || !cookie) {
    res.sendStatus(400);
  }

  let promises = [];
  let data = [];

  let i = 0;
  let numTabs = 1; // TODO: Change this based off of the data from the 1st request

  while (i < numTabs) {
    const url = `https://www.pathofexile.com/character-window/get-stash-items?league=${league}&tabIndex=${tab}&accountName=${user}`;
    promises.push(
      axios
        .get(url, {
          headers: {
            authority: 'www.pathofexile.com',
            cookie: `POESESSID=${cookie}`,
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
          },
        })
        .then((response) => {
          // res.send(response.data);
          data.push(response.data);
        })
        .catch((err) => {
          console.error(err);
        })
    );

    i++;
  }

  Promise.all(promises).then(() => {
    res.sendStatus(200);
  });
});
