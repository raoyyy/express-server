// import xlsx from 'node-xlsx'
var xlsx = require('node-xlsx').default

var express = require('express');
var router = express.Router();
var dbActions = require('../utils/dbActions');

var {
  addQuestion
} = dbActions

const workSheetsFromFile = xlsx.parse('/Users/raoyu/Desktop/实习项目/exam/exam-server/excels/myFile.xlsx')

/* GET home page. */
router.get('/', async function(req, res, next) {
  if (workSheetsFromFile[0].data.length > 0) {
    // 处理选择题
    var data = workSheetsFromFile[0].data
    var questions_promises = data.map(async(x,index)=>{
      // console.log(index)
      if (index == 0) return '标题行'
      // 第一行是标题
      if (x.length == 0 ) return '该行为空'
      // 如果一行中没有任何内容则不插入
      var question = {
        title: x[0],
        options: [],
        answer: x[6]
      }

      if (question.answer.length == 1){
        question.type = '单选题'
      } else if (question.answer.length > 1) {
        // 这个判断必须去除字符中的空格，否则单选题答案中带有空格的，会被误判为多选
        question.type = '多选题'
      }

      for (var i = 1;i < 6;i++){
        // 目前最多支持五个选项，从第一到第六列为选项
        
        if (typeof(x[i]) == 'undefined'){
          continue
        }
        // 如果某一项为空，则跳过
        // TODO 这里还要注意一下，如果有填了AB选项和D选项，但是忘了填C选项的情况
        if (typeof(x[i]) !== 'string'){
          console.log(`第${index+1}行，第${i}列数据格式不能为${typeof(x[i])}，应为文本型`)
          return
        }
        if (x[i].match(/^\s*$/)){
          console.log(`请注意，第${index+1}行，第${i}列数据为空`)
        }
        var item = {}
        item.title = x[i]
        item.index = String.fromCharCode(64 + parseInt(i))
        if (question.answer.indexOf(item.index) !== -1) {
          // TODO answer 必须是 String 对象
          item.isAnswer = true
          // console.log(`${item.index}是正确答案`)
        } else {
          item.isAnswer = false
        }
        // console.log(item)
        question.options.push(item)
      }
      console.log(question)
      console.log('跑到这里',index)
      var result1 = await addQuestion(question)
      return result1
    })
    console.log(questions_promises)
    var result1 = await Promise.all(questions_promises)
    // console.log(result)
    // console.log(typeof result)
    // res.status(200).send({questions:result})
  }
  // console.log(workSheetsFromFile[1])
  // console.log(workSheetsFromFile[2])
  if(workSheetsFromFile[1].data.length > 0){
    // 处理判断题
    var data1 = workSheetsFromFile[1].data
    var questions_promises = data1.map(async(x,index)=>{
      // console.log(index)
      if (index == 0) return '标题行'
      // 第一行是标题
      if (x.length == 0 ) return '该行为空'
      // 如果一行中没有任何内容则不插入
      var question = {
        title: x[1],
        options: [],
        answer: x[2],
        type:"判断题"
      }
      for(var i=1;i<3;i++){
        var item = {}
        item.title = i%2 == 1?"正确":"错误"
        item.index = i%2 == 1?"是":"否"
        if (question.answer.indexOf(item.index) !== -1) {
          // TODO answer 必须是 String 对象
          item.isAnswer = true
          // console.log(`${item.index}是正确答案`)
        } else {
          item.isAnswer = false
        }
        // console.log(item)
        question.options.push(item)
      }
      console.log("result1: "+result1)
      var result2 = await addQuestion(question)
      return result2
      })
      var result2 = await Promise.all(questions_promises)
      var result = result1.concat(result2)

      console.log("result2: "+result2)
      console.log("result: "+result)
      res.status(200).send({questions:result})
  }
});

module.exports = router;
