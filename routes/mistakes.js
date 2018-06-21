var express = require('express');
var router = express.Router();
var dbActions = require('../utils/dbActions');

var {
    updateMistakes
  } = dbActions

router.get('/', async function(req, res, next) {
    
})

router.post('/', async function(req, res, next) {
    //需要传session
    console.log(123)
    var {user_id} = req.body;
    console.log(user_id)
    var mistakes = await updateMistakes(user_id)
    res.status(200).send({'mistakes':mistakes})
})

module.exports = router;