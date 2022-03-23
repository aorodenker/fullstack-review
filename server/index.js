const express = require('express');
let app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json()); // look up
app.use(express.urlencoded({extended: true})); //look up
let helpers = require('../helpers/github.js');
let saveFuncs = require('../database/index.js');

//takes repos and saves them
app.post('/repos', function (req, res) {
  helpers.getReposByUsername(req.body.term, (err, results) => {
    if (err) {
      res.status(500).send('ERROR in server/index.js at app.post')
    } else {
      saveFuncs.save(results)
      res.status(200).send(res.data)
    }
  })
});
//should return top 25 repos
app.get('/repos', (req, res) => {
    saveFuncs.findRepos(req, res)
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

