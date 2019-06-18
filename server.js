const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const multer = require('multer');
const routes = require('./route/appRoute');
// const vision = require('@google-cloud/vision');


const upload = multer({ dest : 'upload/'});
// Initialize http server
const app = express();

// const client = new vision.ImageAnnotatorClient({
// 	keyFilename: 'ApiKey.json'
//   });
  
//   // Performs label detection on the image file
//   client
// 	.labelDetection('./upload/2e27de91-a0f2-4752-9572-aa69eecb0f70.jpg')
// 	.then(results => {
// 	  const labels = results[0].labelAnnotations;
// 	  labels.forEach(label => console.log(label));
// 	})
// 	.catch(err => {
// 	  console.error('ERROR:', err);
// 	});

let port = 4000;
app.use(cors())

app.use(fileUpload({
	limits: { fileSize: 4 * 1024 * 1024 }
}));

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(__dirname + '/'));
app.use('/api',routes);


const server = app.listen(port, () => {
	const { address, port } = server.address();
	console.log(`Listening at http://${address}:${port}`);
});