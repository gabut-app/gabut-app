const router = require('express').Router();
const apiController = require('../controllers/apiController');
const userController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/google-sign-in', userController.googleSignIn);

router.use(authentication);
router.get('/api-cerpen', apiController.cerpen);
router.get('/api-musics', apiController.musics);
router.get('/api-movies', apiController.movies);
router.get('/jokes', apiController.darkJoke);

module.exports = router;
