var express = require("express");
var session = require("express-session");
var queries = require("./functions/queries.js");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var path = __dirname + '/views/';

app.use(express.static(__dirname + '/views/'));
app.use(session({ resave: true , secret: '123456' , saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.use(function (req,res,next) {
  next();
});

router.get("/checkout-fln", function(req,res){
	res.sendFile(path + "checkout-fln.html");
});

app.post('/send', function (req, res){
	queries.insert(req.body.nome, req.body.email, req.body.telefone, req.body.checkin, req.body.pax, req.body.gb, res, req);
});

app.use("/",router);

app.listen(3000,function(){
  console.log("Live at port 3000");
});