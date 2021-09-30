var nodemailer = require('nodemailer');
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
  
  var dadosCompra = [];
  dadosCompra.push(req.body.nome)
  dadosCompra.push(req.body.email)
  dadosCompra.push(req.body.telefone)
  dadosCompra.push(req.body.checkin)
  dadosCompra.push(req.body.pax)
  dadosCompra.push(req.body.gb)
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dan.tfarias@gmail.com',
      pass: 'mmTrgfxl'
    }
  });
  
  var mailOptions = {
    from: 'dan.tfarias@gmail.com',
    to: 'dan.tfarias@gmail.com',
    subject: 'Nova solicitação de compra ViajaPASS - Verifique o pagamento',
    text: dadosCompra.toString()
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

app.use("/",router);

app.listen(3000,function(){
  console.log("Live at port 3000");
});