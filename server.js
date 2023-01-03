const { group } = require('console');
const express = require('express');
const { callbackify } = require('util');
fs = require('fs');
const mysql = require("mysql")

const db = mysql.createConnection({
    host:"database-1.cwh1etckjk2o.us-east-1.rds.amazonaws.com",
    port:"3306",
    user:"admin",
    password:"12345",
    database:"mydb",
});

function addRoute(name, city, desc, stepNames, stepDescs) {
    const query = "INSERT INTO mydb.routes (routename, routedescription, routecity, routesteps, stepdescriptions) VALUES ('" + name + "', '" + city + "', '" + desc + "', '" + stepNames + "', '"+ stepDescs + "')"
    db.query(query);
}

const app = express();
const bodyParser = require("body-parser")
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));

var index;
var upload;
var browse;
var about;

fs.readFile('index.html', function (err, html) {
    if (err) {
        throw err; 
    }
    else {
        index = html;
    }
});

app.post('/create-route', function(req, res) {
    var newName = req.body.name;
    var newDesc = req.body.desc;
    var newCity = req.body.city;
    var stepNames = req.body.stepNameList;
    var stepDescs = req.body.stepDescList;

    addRoute(newName, newDesc, newCity, stepNames, stepDescs)
});

app.post('/load-route', function(req, res) {
    db.query("SELECT * FROM mydb.routes", (err, result) => {
        console.log(result);
        res.send(result);
    })
});

app.post('/load-route-page', function(req, res) {
    db.query("SELECT * FROM mydb.routes", (err, result) => {
        console.log(result);
        res.send(result);
    })
});

fs.readFile('upload.html', function (err, html) {
    if (err) {
        throw err; 
    }
    else {
        upload = html;
    }
});

fs.readFile('browse.html', function (err, html) {
    if (err) {
        throw err; 
    }
    else {
        browse = html;
    }
});

fs.readFile('about.html', function (err, html) {
    if (err) {
        throw err; 
    }
    else {
        about = html;
    }
});

app.get("/", function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.end(index);
});

app.get("/index.html", function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.end(index);
});

app.get("/upload.html", function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.end(upload);
});

app.get("/browse.html", function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.end(browse);
});

app.get("/about.html", function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.end(about);
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

