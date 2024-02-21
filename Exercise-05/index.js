// Import Express dan middlewares
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const multer = require('multer');
const cors = require('cors');

// Setup body-parser untuk parsing request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Setup multer untuk file upload
const upload = multer({dest: 'uploads/'});

// Setup CORS
app.use(cors()); 

// Setup routing
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/upload', upload.single('file'), (req, res) => {
  // Handle file upload here  
  res.send('File uploaded');
});

// Setup static folder
app.use('/public', express.static(__dirname + '/public'));

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');  
});