const router = require('express').Router()
const apiController = require('../controllers/apiController')
const userController = require('../controllers/userController')


router.post('/login', userController.login)
router.post('/register', userController.register)

router.get('/api-cerpen', apiController.cerpen)
router.get('/api-musics', apiController.musics)
router.get('/api-movies', apiController.movies)


module.exports = router