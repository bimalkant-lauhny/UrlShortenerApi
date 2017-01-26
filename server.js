const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const operateDb = require('./operate_db');

var url = 'mongodb://localhost:27017/urlindex';

var app = express(); 
var db;

MongoClient.connect(url, function (err, database) {
    assert.equal(null, err);
    db = database;
    console.log('Connected to server!');
});   

function inputHandler(request, response) {
    var addUrl = request.params.Uid.split('.');
    try {
        if (addUrl[addUrl.length - 1] != 'com') {
            throw new Error('use only .com urls!'); 
        }
       
        operateDb.findDocument(db, {
            "url": "http://" + request.params.Uid
        }, function (err, result) {
            assert.equal(null, err);
            console.log('Found results: ', result);
        });

        //operateDb.findMaxIndex(db, function (err, result) {
        //    assert(null, err);
        //    console.log('Max Index: '); 
        //});

        //operateDb.insertDocument(db, {
        //    'index':
        //});

    } catch (err) {
        response.send(err); 
    }
};

app.all('/http://:Uid', inputHandler);
app.all('/https://:Uid', inputHandler);
app.all('/:Uid', function (request, response) {
    try {
        var Uid = Number(request.params.Uid);
        console.log("when not http: ", Uid);
        if (isNaN(Uid)) {
            throw new Error('This url does not exist!'); 
        }
        //
    } catch (err) {
        console.log(err); 
        response.send(err.message);
    }
});

app.listen(3000);
