const fs = require('fs');
const uuidv4 = require('uuid/v4');
const Tesseract = require('tesseract.js');
const { TesseractWorker } = Tesseract;
const worker = new TesseractWorker();
const path = require('path')

const helperFunction = ( function(){

    function bufferToImage( buffer ){
      return new Promise( ( resolve , reject )=>{
        const { fileData } = buffer;
        const extension = getImageExtension( fileData.name );
        // const bitmap = new Buffer( fileData.data,'base64' );
        writeToFile( fileData.name , fileData.data ,( vin )=>{
            if( vin ) return resolve( vin );
            reject('no vin found!');
        });
      } )
    }

    function writeToFile( image_name, bitmap ,callback){
       let imagename = generateUniqueValue() + '.' + getImageExtension( image_name );
        fs.writeFile('upload/'+ imagename,bitmap,( err )=>{
            if( err ) console.log('error in writing to file',err);
            console.log('image saved');
            let imagePath = path.join(__dirname,'../upload/'+'vin-number.png');
            getTextFromImage( imagePath , ( vin_number )=>{
                callback( vin_number );
            } ); 
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

    function getTextFromImage( imagePath ,callback ){
        console.log('getTextFromImage',imagePath)
        worker.recognize( imagePath ).progress(progress=>{
                console.log('progress',progress)
         }).then(({text}) => {
             console.log('text from image',text);
             callback( text );
            //  getVinNumber( text );
             worker.terminate();
         }).catch((err) => {
             console.log('err',err)
         });
    }

    function getVinNumber( text ){
        const validVin = '';
        const array = text.split(' ');
        console.log('array',array)
        array.forEach( value =>{
            const flag = isValidVin( value );
            if( flag ) {
                validVin = value;
                return;
            }
        });
        console.log('validvin',validVin)
    }

    function isValidVin( vin ){
       let regex = /\b[a-zA-Z0-9]{17}\b/;
       return regex.test( vin ) ? true :false; 
    }

    return {
        bufferToImage
    }

})();

module.exports = helperFunction;

