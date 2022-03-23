const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
mongoose.connection.once('open', () => {
  console.log('connected to db');
})

let userSchema = mongoose.Schema({
  repoId: {
    type: Number,
    unique: true
  },
  repoName: String,
  username: String,
  url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', userSchema);

let save = (userRepo, callback) => {
  for (var x = 0; x < userRepo.length; x++) {
    var repo = new Repo ({
      repoId: userRepo[x].id,
      repoName: userRepo[x].name,
      username: userRepo[x].owner.login,
      url: userRepo[x].html_url,
      forks: userRepo[x].forks
    })
    console.log(repo)
    repo.save()
  }
}

let findRepos = (req, res) => {
  Repo.find().sort({forks:-1}).limit(25)
  .then(repo => res.status(200).send(repo))
  .catch(err => res.status(500).send('ERROR IN app.get'))
}

module.exports =  {
  save,
  findRepos,
}