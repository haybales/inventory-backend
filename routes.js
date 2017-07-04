var express=require("express");
var router = express.Router();

//GET /inventory
router.get("/", (req, res)=>{
  res.json({response: "You sent a GET request to /inventory."});
});

//POST /inventory/new
router.post("/new", (req, res)=>{
  res.json({
    response: "You sent a POST request to /inventory.",
    body: req.body
  });
});

//GET /inventory/:id
router.get("/:id", (req, res)=>{
  res.json({response: "You sent a GET request to /inventory/"+req.params.id});
});

//PUT /inventory/:id
router.put("/:id", (req, res)=>{
  res.json({response: "You sent a PUT request to /inventory/"+req.params.id});
});

//DELETE /inventory/:id
router.delete("/:id", (req, res)=>{
  res.json({response: "You sent a DELETE request to /inventory/"+req.params.id});
});


module.exports = router;
