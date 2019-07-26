const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const server = require('http').Server(app);

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    req.io = io;
    return next();
});

const io = socketIO(server);
io.origins("*:*");
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

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} (:`)
})
