const axios = require('axios');

class ApiController {
  static cerpen(req, res) {
    axios({
      method: 'GET',
      url: 'http://api.fdci.se/cerpen',
    })
      .then((response) => {
        let cerpen = response.data;
        res.status(200).json({ cerpen });
      })
      .catch((err) => {
        res.status(500).json({ msg: 'invalid server error' });
      });
  }

  static cerpen(req, res) {}

  static async musics(req, res) {
    try {
      let musician = [
        'coldplay',
        'dua lipa',
        'jason mraz',
        'black pink',
        'lady gaga',
        'selena gomez',
      ];
      let random = Math.floor(Math.random() * musician.length);
      const response = await axios.get(
        `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${musician[random]}`
      );
      const artist = response.data;
      let id = null;
      artist.artists.forEach((element) => {
        if (element.idArtist) {
          id = element.idArtist;
        }
      });
      console.log(id);
      const data = await axios.get(
        `https://theaudiodb.com/api/v1/json/1/mvid.php?i=${id}`
      );
      let linkVideo = [];
      data.data.mvids.forEach((element) => {
        if (element.strMusicVid) {
          linkVideo.push(element.strMusicVid);
        }
      });
      console.log(linkVideo);
      res.status(200).json({ linkVideo });
    } catch (err) {
      res.status(400).json({ msg: `Bad request` });
    }
  }

  static movies(req, res) {}
}

module.exports = ApiController;
