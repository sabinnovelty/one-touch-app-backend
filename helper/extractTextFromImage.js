const TesseractWorker = require('tesseract.js');
const worker = new TesseractWorker();

const extractTextFromImage = async ( my_image )=>{
   return  worker.recognize( my_image ).progress(progress=>{
        console.log('progress',progress)
    })
};

module.exports = extractTextFromImage;