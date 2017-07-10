var express = require("express");
var app = express();
var routes = require("./routes")
var jsonParser = require("body-parser").json;
var logger = require("morgan");
var port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(jsonParser());

app.use("/inventory", routes);

// catch 404 and forward to error handler
app.use((req, res, next)=>{
  var err = new Error("Path not found.");
  err.status = 404;
  next(err);
});

//Error handler
app.use((err, req, res, next)=>{
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

app.listen(port, ()=>{
  console.log("Server running on port", port);
});
