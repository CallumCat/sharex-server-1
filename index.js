const express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , formidable = require('formidable')
  , util = require('util')
  , crypto = require('crypto');

app.use(bodyParser());
app.post('/', function (req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req);
  
  form.on('fileBegin', function (name, file) {
    const randomHash = crypto.randomBytes(5).toString('hex');
    file.path = `/var/www/media/${randomHash}.png`; //  change this to change file directory
    res.json({
      location: `http://skrt.me/${randomHash}.png`
    });
  });
})

app.listen(80);