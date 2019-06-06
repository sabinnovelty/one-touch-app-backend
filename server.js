const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const multer = require('multer');
const routes = require('./route/appRoute')

const upload = multer({ dest : 'upload/'});
// Initialize http server
const app = express();

let port = 3000;
app.use(cors())

app.use(fileUpload({
	limits: { fileSize: 4 * 1024 * 1024 }
}));

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(__dirname + '/'));
app.use('/api',routes);

// app.post('/api/upload',upload.single('fileData'),( request , response )=>{
// 	console.log('11111',request.files)
// })

//Launch the server on port 3000
const server = app.listen(port, () => {
	const { address, port } = server.address();
	console.log(`Listening at http://${address}:${port}`);
});