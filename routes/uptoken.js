var express = require('express');
var router = express.Router();
var qiniu = require('qiniu');

router.get('/', function (req, res) {
	var accessKey = '5tS2bA03JPdBkSyuDtVVxPGCq2TF8Pah7H5Wwsjx';
	var secretKey = 'Po4cwKozlMu9cZ01x_MAZ8y_M9zS69ziCRkfgy_F';
	var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
	var options = {
	  scope: 'leading-tech'
	};
	var putPolicy = new qiniu.rs.PutPolicy(options);
	var uptoken = putPolicy.uploadToken(mac);

	res.send({"uptoken":uptoken});
});

module.exports = router;