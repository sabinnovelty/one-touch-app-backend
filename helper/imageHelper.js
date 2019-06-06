const fs = require('fs');
const uuidv4 = require('uuid/v4');
const TesseractWorker = require('tesseract.js');
const worker = new TesseractWorker();

const helperFunction = ( function(){

    function bufferToImage( buffer ){
        const { fileData } = buffer;
        console.log('buffer',fileData.data)
        const extension = getImageExtension( fileData.name );
        // const bitmap = new Buffer( fileData.data,'base64' );
        writeToFile( fileData.name , fileData.data );
    }

    function writeToFile( image_name, bitmap ,extension ){
       let imagename = generateUniqueValue() + '.' + getImageExtension( image_name );
        fs.writeFile('upload/'+ imagename,bitmap,( err )=>{
            if( err ) console.log('error in writing to file',err);
            console.log('image saved');
        })
    }
    
    // const extractTextFromImage = async ( my_image )=>{
    //      worker.recognize().progress(progress=>{
    //          console.log('progress',progress)
    //      })
    //  };
     
    
    function getImageExtension ( image_name ){
        let array = image_name.split('.');
        return array[1];
    };

    function generateUniqueValue(){
        let filename = uuidv4();
        return filename;
    }

    function getTextFromImage(){
        
    }

    return {
        bufferToImage
    }

})();

module.exports = helperFunction;

