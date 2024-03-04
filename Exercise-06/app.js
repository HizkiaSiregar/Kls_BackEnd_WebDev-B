// app.js
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const users = require('./users');

const app = express();

app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public'));

const upload = multer({ dest: 'public/' });

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:name', (req, res) => {
  const user = users.find(u => u.name.toLowerCase() === req.params.name.toLowerCase());
  if (!user) {
    return res.status(404).json({ message: 'Data user tidak ditemukan' });
  }
  res.json(user);
});

app.post('/users', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: 'Masukan data yang akan diubah' });
  }
  const user = { id: users.length + 1, name: req.body.name };
  users.push(user);
  res.json(user);
});

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ message: 'File berhasil diupload' });
});

app.put('/users/:name', (req, res) => {
  const user = users.find(u => u.name.toLowerCase() === req.params.name.toLowerCase());
  if (!user) {
    return res.status(404).json({ message: 'Data user tidak ditemukan' });
  }
  if (!req.body.name) {
    return res.status(400).json({ message: 'Masukan data yang akan diubah' });
  }
  user.name = req.body.name;
  res.json(user);
});

app.delete('/users/:name', (req, res) => {
  const index = users.findIndex(u => u.name.toLowerCase() === req.params.name.toLowerCase());
  if (index === -1) {
    return res.status(404).json({ message: 'Data user tidak ditemukan' });
  }
  const user = users.splice(index, 1);
  res.json(user);
});

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'resource tidak ditemukan' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'terjadi kesalahan pada server' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
