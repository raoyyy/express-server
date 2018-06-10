var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/exam');
//注意修改数据库名称

var questions = db.get('questions');

var addQuestion = function(newQuestion) {
    console.log('运行中')
    return new Promise(function(resolve, reject){
        questions.insert(newQuestion, function (e, doc) {
            if (e) {
                reject(new Error("向 records表中插入数据时发生错误"));
            }
            else {
                resolve(doc)
                console.log('成功插入')
                //这里的 doc 是 records 表中新插入的这一条记录
            }
        })
    })
}

var getQuestions = function(){
    return new Promise(async (resolve,reject) => {
        const data = await questions.find().catch((error) => {
            reject(new Error("查找 questions 表时发生错误", error))
        })
        resolve(data)
    })
};


module.exports = {
    addQuestion,
    getQuestions
}