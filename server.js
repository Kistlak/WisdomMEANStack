const { mongoose } = require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const employeeController = require('./controllers/employeeController');
const cors = require('cors');
// var fileRoutes = require('./routers/file');

var app = express();
app.use(bodyParser.json());
app.use(cors( { origin: 'http://localhost:4200'} ));
// app.use('/file',fileRoutes);

// app.set('views', path.join(_dirname, '/views/'));
// app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layputDir: _dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express Done');
});

app.use(function(req, res, next) {
//set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/employee', employeeController);