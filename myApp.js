const mySecret = process.env['MESSAGE_STYLE']


var express = require('express');
var app = express();
var bodyParser = require("body-parser");



app.use((req,res,next)=>{
  console.log(req.method+" "+req.path+" - "+ req.ip)
  next();
})


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

console.log('Hello World');



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});


app.use('/public', express.static(__dirname +'/public'))



app.get("/json" ,function(req, res){
  if (process.env.MESSAGE_STYLE === mySecret){
  res.json({"message": "HELLO JSON"})
  } else {res.json(
          {"message": "Hello json"}
        )}
});


app.get('/now', (req, res, next)=>{
  req.time = new Date().toString();
  next();
}, (req, res)=>{
  res.json({time: req.time});
});


app.get('/:word/echo',(req,res)=>{
  res.json({echo:req.params.word})
})

app.get('/name',(req,res)=>{
  res.json({name: req.query.first +" " + req.query.last})
})

app.post('/name',(req,res)=>{
res.json({name: req.body.first +" " + req.body.last})
})






 module.exports = app;
