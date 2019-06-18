const router  = require('express').Router();
const multer = require('multer');
const helperFunction = require('../helper/imageHelper');
const httpResponse = require('../httpResponse/response');

const upload = multer({ dest : 'upload/'});


router.post('/',upload.single('fileData'),async ( request , response )=>{
    console.log('11111',request.files);
    const vin_number = await helperFunction.bufferToImage( request.files );
    console.log('finally got a vin number,Yeh !',vin_number);
    httpResponse.success( response , {vin:vin_number})
})

module.exports  = router;