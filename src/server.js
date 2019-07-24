const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect('mongodb+srv://react:react@cluster0-jl4i1.mongodb.net/react?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

app.listen(process.env.PORT || 3333);

