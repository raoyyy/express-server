// import xlsx from 'node-xlsx'
var xlsx = require('node-xlsx').default

var express = require('express');
var router = express.Router();

const workSheetsFromFile = xlsx.parse('/Users/VincentWong/Develop/TestServer/exam-server/excels/myFile.xlsx')

/* GET home page. */
router.get('/', function(req, res, next) {
  if (workSheetsFromFile[0].data.length > 0) {
    var data = workSheetsFromFile[0].data
    data.map((x,index)=>{
      console.log(index)
      if (index == 0) return
      // 第一行是标题
      if (x.length == 0 ) return
      // 如果一行中没有任何内容则不插入
      var question = {
        title: x[0],
        options: [],
        answer: x[6]
      }
      for (var i = 1;i < 6;i++){
        // 目前最多支持五个选项，从第一到第六列为选项
        if (typeof(x[i]) == undefined) return
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
          console.log(`${item.index}是正确答案`)
        } else {
          item.isAnswer = false
        }
        console.log(item)
        question.options.push(item)
      }

      if (question.answer.length == 1){
        question.type = 'single chose'
      } else if (question.answer.length > 1) {
        question.type = 'mutiple chose'
      }
      console.log(question)
      console.log(question.answer.length)
    })
  }
  // console.log(workSheetsFromFile[1])
  // console.log(workSheetsFromFile[2])
});

module.exports = router;
