var express = require('express')
var multer = require('multer')
var fs = require('fs')
var router = express.Router()

var uploadExcel = multer({
    dest: 'upload'
})

var type = uploadExcel.single('thumbnail')

router.post('/',type,async function(req,res,next){
    console.log(req.file)
    var tmp_path = req.file.path;
    console.log(tmp_path)
  /** The original name of the uploaded file
      stored in the variable "originalname". **/
  var target_path = 'upload/' + req.file.originalname;

  /** A better way to copy the uploaded file. **/
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  fs.unlinkSync(tmp_path);
  src.on('end', function() { res.render('complete'); });
//   src.on('error', function(err) { res.render('error'); });
})

router.get('/', async function(req, res, next) {
    res.status(200).send('upload')
})

module.exports = router;