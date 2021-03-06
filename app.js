const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});
const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item",itemsSchema);

const item1 = new Item({
  name:"Welcome to the ToDo List!"
});
const item2 = new Item({
  name:"Hit the + button to Add a new Item"
});
const item3 = new Item({
  name:" <--- Hit This to Delete Item"
});

const defaultItems = [item1, item2, item3];   

Item.insertMany(defaultItems,function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Items Saved");
  }
});

app.get("/", function (req, res) {
  res.render("list", { listTitle: "Today", newListItems: items });
});

app.post("/",function(req,res){
    let item = req.body.newItem;
    if(req.body.list === "Work"){
      workItems.push(item);
      console.log(req.body);
      res.redirect("/work");
    }
    else{
      items.push(item);
      res.redirect("/");
    }
});

app.get("/work",function(req,res){
    res.render("list",{ listTitle:"Work List", newListItems:workItems});
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
