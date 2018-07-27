var express = require('express')
var multer = require('multer')
var fs = require('fs')
var router = express.Router()

var uploadExcel = multer({
    dest: 'upload'
})

var type = uploadExcel.single('excelFile')
console.log(type)

router.post('/',type,async function(req,res,next){
    console.log(req.file)
    console.log(req.body)
    var tmp_path = req.file.path;
    console.log(tmp_path)
    var target_path = 'upload/' + req.file.originalname;
    console.log(target_path)

  /** A better way to copy the uploaded file. **/
  if (!fs.existsSync('upload/')) {
    fs.mkdirSync('upload/');
}
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  //src.on('end', function() { res.render('complete'); });
//   fs.unlinkSync(tmp_path);
  src.on('end', function() { 
    res.end(); 
    fs.unlinkSync(tmp_path);
  });
  src.on('error', function(err) { 
    res.end(); 
    console.log(err);
  });

})

router.get('/', async function(req, res, next) {
    res.status(200).send('upload')
})

module.exports = router;