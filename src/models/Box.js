const mongoose = require('mongoose');

const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId, ref: "File"
    }]
}, {
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

Box.virtual('url').get(function () {
    const url = process.env.URL || 'http://localhost:3000';
    return `${url}/box/${this._id}`;
});


module.exports = mongoose.model('Box', Box);

