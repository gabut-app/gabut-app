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

  static async movies(req, res) {
    // const { popularity } = req.query
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

      res.status(200).json({ movies })

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

}

module.exports = ApiController
