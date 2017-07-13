var express=require("express");
var router = express.Router();
var model=require("./model");

//GET /inventory
router.get("/", (req, res)=>{
  model.getItems(function(docs){
    res.json({
      response: "You sent a GET request to /inventory.",
      items: docs
    });
  });
});

//POST /inventory/new
router.post("/new", (req, res)=>{
  model.addItem(req.body.item);
  res.json({
    response: "You sent a POST request to /inventory/new.",
    body: req.body
  });
});

//PUT /inventory/:id
router.put("/:id", (req, res)=>{
  model.updateItem(req.params.id, req.body.item);
  res.json({response: "You sent a PUT request to /inventory/"+req.params.id});
});

//DELETE /inventory/:id
router.delete("/:id", (req, res)=>{
  model.removeItem(req.params.id);
  res.json({response: "You sent a DELETE request to /inventory/"+req.params.id});
});


module.exports = router;
