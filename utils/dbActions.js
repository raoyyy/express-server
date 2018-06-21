var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/exam');
//注意修改数据库名称

var questions = db.get('questions');
var users = db.get('users')

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

var getMistakes = function(){
    return new Promise(function(resolve,reject){
        //暂时不做权限限制，只要知道 user_id 就可以获取用户数据
        users.find({"_id":user_id},{},async function (e,doc){
            if (e) {
                res.send("查找数据时发生错误");
            } 
            else {
                if (doc.length == 0){
                    reject(new Error("couldn't find userInfo"));
                }
                else {
                    var userInfo = doc[0];
                    var note = await getNote(openid,user_id)
                    // 需要知道请求者的 openid 才能返回对应的备注名
                    if (note.noteName){
                        userInfo.info.noteName = note.noteName
                    }
                    resolve(userInfo);
                }
            }
        })
    })
};

var updateMistakes = function(user_id){
    return new Promise(async (resolve,reject) => {
        user_id.map(user_id => {
            questions.find({"_id":user_id},{},function (e,doc){
                if (e) {
                    reject(new Error("查找user表数据时发生错误"));
                } 
                else {
                    // if (doc.length == 0){
                    //     var newUser = {
                    //         "user_id":user_id,
                    //         // "avatarUrl":"",
                    //         // "records":[],
                    //         "mistakes":{}
                    //     }
                        // users.insert(newUser,function (e,doc){
                        //     if (e){
                        //         reject(new Error("在 users 表中插入新用户数据时发生错误"))
                        //     }
                        //     else {
                        //         resolve(newUser);
                        //     }
                    //     })
                    // }
                    // else{
                        var mistakes = doc[0];
                        users.insert(mistakes,function (e,doc){
                            if (e){
                                reject(new Error("在 users 表中插入新用户数据时发生错误"))
                            }
                            else {
                                resolve(mistakes);
                            }
                        })                       
                        resolve(mistakes);
                    
                }
            })
        })
    })
    
};


module.exports = {
    addQuestion,
    getQuestions,
    getMistakes,
    updateMistakes
}