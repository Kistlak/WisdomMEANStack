// Express get
// const express = require('express');
// var router = express.Router();
//
// router.get('/', (req, res) => {
//     res.json('Sample');
// });
//
// module.exports = router;

const express = require('express');
var router = express.Router();
var multer = require('multer');
var DIR = './uploads/';
var upload = multer({dest: DIR}).single('photo');

var { Employee } = require('../models/employee');
var ObjectId = require('mongodb').ObjectID;

router.get('/', (req,res) => {
    Employee.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Err ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Nop : ${req.params.id}');

    Employee.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Err' +JSON.stringify(err, undefined, 2)); }
    });
});


router.post('/', (req,res) => {
    var emp = new Employee({
        username: req.body.username,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });
    emp.save((err, doc) => {
        if(!err) { res.send(doc); }
        else { console.log('Err' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('Nop ${req.params.id}');

    var emp = {
        username: req.body.username,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('err' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('Nop ${req.params.id}');

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('err' + JSON.stringify(err, undefined, 2)); }
    });
});

//our file upload function.
router.post('/upload', function (req, res, next) {
    var path = '';
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            console.log(err);
            return res.status(422).send("an Error occured")
        }
        // No error occured.
        path = req.file.path;
        //console.log(res);
        return res.send("Upload Completed for "+path);
    });
})

module.exports = router;