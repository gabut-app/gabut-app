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

  // static cerpen(req, res) {}

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
      let thumbnail = null;
      let artistName = null;
      let id = null;
      artist.artists.forEach((element) => {
        if (element.idArtist) {
          id = element.idArtist;
          artistName = element.strArtist;
          thumbnail = element.strArtistThumb;
        }
      });
      const data = await axios.get(
        `https://theaudiodb.com/api/v1/json/1/mvid.php?i=${id}`
      );
      let linkVideo = [];
      data.data.mvids.forEach((element) => {
        if (element.strMusicVid) {
          linkVideo.push(element.strMusicVid);
        }
      });
      let randomPickVideo = Math.floor(Math.random() * linkVideo.length);
      let selectedVideo = linkVideo[randomPickVideo];
      res.status(200).json({ artistName, thumbnail, selectedVideo });
    } catch (err) {
      res.status(400).json({ msg: `Bad request` });
    }
  }

  static async movies(req, res) {
    try {
      const dataGenres = await getGenres()
      const dataMovies = await getMovies()

      // Construct new movies data
      const movies = dataMovies.map(movie => {
        movie.poster_path = 'https://image.tmdb.org/t/p/w500' + movie.poster_path
        movie.backdrop_path = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path
        movie.genre_ids = movie.genre_ids.map(id => {
          const genre = dataGenres.find(genre => genre.id === id)
          return genre.name
        })
        return movie
      })

      // Random Movies
      const shuffledMovies = movies
        .map(a => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)

      // Get half size
      const halfLength = Math.ceil(shuffledMovies.length / 2)
      const firstTenMovies = shuffledMovies.splice(0, halfLength)

      res.status(200).json({ movies: firstTenMovies })

    } catch (error) {
      console.log('error', error)
      res.status(404).json({ msg: 'Movies not found' })
    }

    function getMovies() {
      const baseUrl = 'https://api.themoviedb.org/3/discover/movie'

      return axios.get(baseUrl, {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: 'en-US',
          sort_by: 'popularity.desc',
          include_adult: false,
          include_video: false,
          page: 1
        }
      })
        .then(response => response.data.results)
    }

    function getGenres() {
      const baseUrl = 'https://api.themoviedb.org/3/genre/movie/list'

      return axios.get(baseUrl, {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: 'en-US'
        }
      })
      .then(response => response.data.genres)
    }
  }

  static async darkJoke(req, res) {
    try {
      let randomJoke = [];
      const joke = await axios.get(
        'https://sv443.net/jokeapi/v2/joke/Programming?amount=5'
      );
      // console.log(joke.data);
      joke.data.jokes.forEach((element) => {
        if (element.joke) {
          randomJoke.push(element.joke);
        }
      });
      res.status(200).json({ randomJoke });
    } catch (err) {
      res.status(404).json({ msg: `Joke not found` });
    }
  }

}

module.exports = ApiController;
