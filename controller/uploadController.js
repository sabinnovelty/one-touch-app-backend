const router  = require('express').Router();
const multer = require('multer');
const helperFunction = require('../helper/imageHelper');

const upload = multer({ dest : 'upload/'});


router.post('/',upload.single('fileData'),( request , response )=>{
    console.log('11111',request.files);
    helperFunction.bufferToImage( request.files );
})

module.exports  = router;