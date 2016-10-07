var express = require('express');
var  app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

var cors = require('cors');
app.use(cors())

app.post('/tests',function(req,res){
  console.log(req.body);
  res.send("成功")
})

app.listen(3000, function() {
  console.log('running on port 3000...')
})
