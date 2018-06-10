var express = require('express');
var router = express.Router();
var dbActions = require('../utils/dbActions');

var {
    getQuestions
  } = dbActions

router.get('/', async function(req, res, next) {
    var questions = await getQuestions()
    res.status(200).send({'questions':questions})
})

module.exports = router;