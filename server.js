'use strict';

var express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var CropPieces = require('./crop-pieces');
var fs = require('fs');

var app = express();

const OUTDIR = 'cropped/';

/**
 * Example
 * curl -X POST -H "Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW" -F "image=@376792_10100967765951080_390398556_n.jpg" -F "parts=[{"width": 100, "height": 20, "x": 30, "y": 70}]" 'http://localhost:3000/crop'
 */

var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }]);
app.post('/crop', cpUpload, function (req, res) {
  try { //too lazy
    var fpath = req.files.image[0].path;
    var cutList = JSON.parse(req.body.parts);
    let clValid = cutList.every(e => {
      return ['height', 'width', 'x', 'y'].every(i => e.hasOwnProperty(i));
    });
    if (!clValid) { throw new Error('invalid param parts') }
  }
  catch(e) {
    //TODO: does not remove uploaded files on error here
    console.error(e);
    return res.status(500).send({error: e.toString()});
  }
  CropPieces.cutImgList(fpath, cutList, OUTDIR, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({error: err.toString()});
    } else {
      res.send(result);
    }
    fs.unlink(fpath);
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
