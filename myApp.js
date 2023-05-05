require("dotenv").config();
let express = require("express");
let bodyparser = require('body-parser')

// create an express instance
let app = express();

//log to the console
console.log("Hello World");

//display static files
//app.use() displays to all routes
app.use("/public", express.static(__dirname + "/public"));


// using app.use to implemment all routes
app.use(function (req, res, next) {
  var s = req.method + " " + req.path + " - " + req.ip;
  console.log(s);
  next();
});

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json());

// /root route
app.get("/", function (req, res) {
  var absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

// return response as json using .json()
app.get("/json", function (req, res) {
  var obj = { message: "Hello json" };
  if (process.env.MESSAGE_STYLE == "uppercase") {
    obj.message = obj["message"].uppercase;
  }
  res.json(obj);
});

app.get("/now",  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    let t = { time: req.time };
    console.log(t);
    res.json(t);
  }
);

app.get("/:word/echo", function (req, res) {
  var word = req.params.word;
  word = { echo: word };
  res.json(word);
});

app.route("/name").get(function (req, res) {
    let firstname = req.query.first
    let lastname = req.query.last
    let fullname = firstname + " " + lastname
    let obj = {"name": fullname}
    res.json(obj)
  }).post(function (req, res) {  
    let firstname = req.body.first
    let lastname = req.body.last
    let fullname = firstname + " " + lastname
    let obj = {"name": fullname}
    res.json(obj)
  })
module.exports = app;
