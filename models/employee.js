const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    username: {type: String },
    position: {type: String },
    office: {type: String },
    salary: {type: Number }
});

module.exports = {Employee};