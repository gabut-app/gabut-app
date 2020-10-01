const axios = require('axios')

class ApiController {
  static cerpen(req, res) {
    axios({
      method: 'GET',
      url: 'http://api.fdci.se/cerpen'
    })
      .then(response => {
        let cerpen = response.data
        res.status(200).json({ cerpen })
      })
      .catch(err => {
        res.status(500).json({ msg: 'invalid server error'})
      })
  }

  static musics(req, res) {

  }

  static movies(req, res) {
    
  }

}

module.exports = ApiController