const axios = require('axios');
const config = require('./config.js');

let getReposByUsername = (term, callback) => {
  let options = {
    url: `https://api.github.com/users/${term}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  axios.get(options.url)
  .then(res => {
    console.log('RESPONSE SENT helpers/github.js')
    callback(null, res.data)
  })
  .catch(err => {
    console.log(err, 'ERROR helpers/github.js')
    callback(err, null)
  })

}

module.exports.getReposByUsername = getReposByUsername;