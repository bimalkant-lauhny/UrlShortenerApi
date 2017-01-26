const assert = require('assert');

exports.insertDocument = function (db, doc, callback) {
    console.log(doc);
    db.collection('urlmap').insertOne(doc, function (err, result) {
        assert.equal(null, err);
        console.log('Inserted Document successfully: ', result);
        callback(null, result);
    });
};

exports.findDocument = function (db, doc, callback) {
    var coll = db.collection('urlmap');
    coll.findOne(doc, function (err, result) {
        assert.equal(null, err); 
        console.log(result);
        callback(null, result);
    });
};

exports.findMaxIndex = function (db, callback) {
    db.collection('urlmap').aggregate([{
        $project: {
            'index': 1 
        }},{
        $group: {
            '_id': null,
            'max': {$max: "$index"}
        }}
    ], function (err, result) {
        assert.equal(null, err);
        console.log('Completed aggregation max search: ', result);  
        callback(null, result[0].max);
    });
};
