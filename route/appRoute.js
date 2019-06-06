const Router = require('express').Router;

const uploadController = require('../controller/uploadController');

let router = Router();


router.use('/upload', uploadController);


module.exports = router;