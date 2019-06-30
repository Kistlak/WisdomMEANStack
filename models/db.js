const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/CrudDB', { useNewUrlParser: true }, (err) => {

    if(!err)
    {
        console.log("Done");
    }
    else
    {
        console.log('Err' +err);
    }
});

module.exports = mongoose;

// require('./employee.model');