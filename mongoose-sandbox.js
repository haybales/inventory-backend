var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

db.on("error", (err)=>{
  console.log("connection error:", err);
});

db.once("open", ()=>{
  console.log("connection successful.");
  //all database coms here

  var Schema = mongoose.Schema;
  var AnimalSchema = new Schema({
    type: {type: String, default: "goldfish"},
    color: {type: String, default: "golden"},
    size: {type: String, default: "small"},
    mass: {type: Number, default: 0.007},
    name: {type: String, default: "Angela"},
  });

  var Animal = mongoose.model("Animal", AnimalSchema);



  var elephant = new Animal({
    type: "elephant",
    color: "grey",
    size: "big",
    mass: 6000,
    name: "Lawrence"
  });

  var animal = new Animal();

  //async, use callback
  Animal.remove({}, ()=>{
    elephant.save((err)=>{
      if(err) console.log("Save failed!");
      animal.save((err)=>{
        if(err) console.log("Save failed!");
        db.close(()=>{
          console.log("db connection closed.");
        });
      });
    });
  });








});
