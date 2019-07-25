const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3333;
const INDEX = path.join(__dirname, 'index.html');
const app = express();
const server = app.use((req, res) => res.sendFile(INDEX) ).listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);
io.on('connection', (socket) => {
  socket.on('connectRoom', box => {
      socket.join(box);
  });
});

mongoose.connect('mongodb+srv://react:react@cluster0-jl4i1.mongodb.net/react?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use(require('./routes'));
