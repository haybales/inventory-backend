var express = require("express");
var app = express();
var routes = require("./routes")
var jsonParser = require("body-parser").json;
var logger = require("morgan");
var port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(jsonParser());

app.use("/inventory", routes);

app.listen(port, ()=>{
  console.log("Server running on port", port);
});
