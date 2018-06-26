var express = require('express');
var router = express.Router();
var dbActions = require('../utils/dbActions');

var {
    getMyUserInfo,
    updateMyUserInfo,
    getMistakes
  } = dbActions

router.get('/', async function(req, res, next) {
    var {user_id} = req.query;
    console.log(user_id)
    var myUserInfo = await getMyUserInfo(user_id)
    console.log(myUserInfo.mistakes)
    res.status(200).send({'users':myUserInfo})
})

router.get('/myMistakes',async function(req, res, next) {
    var {user_id} = req.query;
    console.log(user_id)
    var myUserInfo = await getMyUserInfo(user_id)
    var mistakes = myUserInfo.mistakes
    console.log("mistakes: "+mistakes) //返回错题id数组
    var mistakes_promises = mistakes.map(function (mistakes_id) {
        return getMistakes(mistakes_id)
    });
    console.log(mistakes_promises)
    var mistakesQuestions =  await Promise.all(mistakes_promises)
    console.log("mistakesQuestions: "+mistakesQuestions)
    // var myMistakes = await getMistakes(user_id,mistakes)
    res.status(200).send({mistakesQuestions})
})

// router.get('/', async function(req, res, next) {
//     res.status(200).send({'questions')
// })

router.put('/mistakes', async function(req, res, next) {
    //需要传session
    var myUserInfo = {}
    var {user_id,mistakes} = req.body;
    // console.log("mistakes: "+mistakes) 获取到最新的mistakes
    myUserInfo = await getMyUserInfo(user_id)
    myUserInfo.mistakes = mistakes;
    console.log(myUserInfo) //已经更新了最新的myUserInfo
    var users = await updateMyUserInfo(user_id,myUserInfo)
    res.status(200).send({'users':users})
})

module.exports = router;