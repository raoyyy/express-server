var express = require('express');
var router = express.Router();
var dbActions = require('../utils/dbActions');

var {
    getQuestions,
    getQuestionsList
  } = dbActions

router.get('/', async function(req, res, next) {
    var questions = await getQuestions()
    res.status(200).send({'questions':questions})
})

//addQuestions
// router.post('/', async function(req, res, next) {
    
//     var newQuestions = req.body.params;
//     var addQuestion = {}  //post的对象
//     console.log(newQuestions)
//     addQuestion.title = newQuestions.question
//     addQuestion.options=[]
//     console.log("Answer length: "+newQuestions.answer.length)
//     if(newQuestions.answer.length>1){
//         addQuestion.type = "多选题"
//     }
//     addQuestion.answer = newQuestions.answer
//     var option1 = {}
//     option1.title = newQuestions.optionA
//     option1.index = "A"
//     if( newQuestions.answer.indexOf(option1.index)!= -1){
//         option1.isAnswer = true
//     } else {
//         option1.isAnswer = false
//     }
//     addQuestion.options.push(option1)

//     var option2 = {}
//     option2.title = newQuestions.optionB
//     option2.index = "B"
//     if( newQuestions.answer.indexOf(option2.index)!= -1){
//         option2.isAnswer = true
//     } else {
//         option2.isAnswer = false
//     }
//     addQuestion.options.push(option2)

//     var option3 = {}
//     option3.title = newQuestions.optionC
//     option3.index = "C"
//     if( newQuestions.answer.indexOf(option3.index)!= -1){
//         option3.isAnswer = true
//     } else {
//         option3.isAnswer = false
//     }
//     addQuestion.options.push(option3)

//     var option4 = {}
//     option4.title = newQuestions.optionD
//     option4.index = "D"
//     if( newQuestions.answer.indexOf(option4.index)!= -1){
//         option4.isAnswer = true
//     } else {
//         option4.isAnswer = false
//     }
//     addQuestion.options.push(option4)

//     var option5 = {}
//     option5.title = newQuestions.optionE
//     option5.index = "E"
//     if( newQuestions.answer.indexOf(option5.index)!= -1){
//         option5.isAnswer = true
//     } else {
//         option5.isAnswer = false
//     }
//     addQuestion.options.push(option5)

//     console.log("addQuestion")
//     console.log(addQuestion)
    
//     var questions = await addQuestion()
//     res.status(200).send({'questions':questions})
// })

router.get('/list', async function(req, res, next) {
    console.log(req.query)
    var page = req.query.page
    var name = req.query.name
    var questions = await getQuestionsList(name,page)
    res.status(200).send({'questions':questions})
})
module.exports = router;