var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

// Connection URL
var url = 'mongodb://localhost:27017/inventory';


var addItem = function(item){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    insertDocuments([item], db, ()=>{
      db.close();
    });
  });
};


//TODO: fix this
var updateItem = function(params, updateData){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    updateDocument({"_id": new ObjectId(params)}, updateData, db, ()=>{
      db.close();
    });
  });
};

var getItems = function(callback){
  var results;
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    findDocuments({}, db, function(docs){
      callback(docs);
      db.close();
    });
  });
}

var removeItem = function(params){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    removeDocument({"_id": new ObjectId(params)}, db, ()=>{
      db.close();
    });
  });
};




var insertDocuments = function(docs, db, callback) {
  // Get the documents collection
  var collection = db.collection('items');
  // Insert some documents
  collection.insertMany(docs, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted "+result.result.n+" documents into the collection");
    callback(result);
  });
}

var findDocuments = function(params, db, callback) {
  // Get the documents collection
  var collection = db.collection('items');
  // Find some documents
  collection.find(params).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

var updateDocument = function(params, update, db, callback) {
  // Get the documents collection
  var collection = db.collection('items');
  // Update document where a is 2, set b equal to 1
  collection.updateOne(params
    , { $set: update }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document");
    callback(result);
  });
}

var removeDocument = function(params, db, callback) {
  // Get the documents collection
  var collection = db.collection('items');
  // Delete document where a is 3
  collection.deleteOne(params, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document");
    callback(result);
  });
}


module.exports = {
  addItem: addItem,
  updateItem: updateItem,
  getItems: getItems,
  removeItem: removeItem
}
