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

var getMyUserInfo = function(user_id){
    return new Promise(function(resolve,reject){
        //暂时不做权限限制，只要知道 user_id 就可以获取用户数据
        users.find({"user_id":user_id},{},async function (e,doc){
            // if (e) {
            //     res.send("查找数据时发生错误");
            // } 
            // else {
                 if (doc.length == 0){
                    var newUser = {
                        "user_id":"raoyu0928",
                        "openid": "openid1",
                        "department":"前端开发",
                        "avatarUrl":"",
                        "name":"饶煜。",
                        "records":[],
                        "mistakes":[]
                    }
                    users.insert(newUser, function(e,doc){
                        if(e){
                            reject(new Error("在 users 表中插入新用户数据时发生错误"))
                        }
                        else {
                            resolve(newUser)
                        }
                    })
                }
                else {
                    var myUserInfo = doc[0];
                    resolve(myUserInfo)
                    // var myUserInfo = doc[0];
                    // var mistakes = myUserInfo.mistakes;//成功返回错题id
                    // mistakes.map(mistake => {
                    //     questions.find({"_id":mistake},{},async function (e,doc){

                    //     })
                    // })
                    // resolve(myUserInfo)
                }
            
         })
        })
    }

var updateMyUserInfo = function(user_id,myUserInfo) {
        //这里更新的对象也应该是完整的 用户表数据 userInfo
        return new Promise(function(resolve, reject){
            users.update({"user_id":user_id},myUserInfo, function (e, doc) {
                if (e) {
                    reject(new Error("这里更新数据时发生错误"));
                }
                else {
                    resolve(doc);
                }
            })
        })
    };

var getMistakes = function(user_id){
    return new Promise(async (resolve,reject) => {      
        questions.find({"_id":user_id},{},function (e,doc){
            if (e) {
                reject(new Error("查找user表数据时发生错误"));
            } 
            else {
                var mistakes = doc[0]
                resolve(mistakes)
            }
        })
    })
}

// var updateUsers = function(user_id,userInfo){
//     return new Promise(async (resolve,reject) => {
//         user_id.map(user_id => {
//             questions.find({"_id":user_id},{},function (e,doc){
                // if (e) {
                //     reject(new Error("查找user表数据时发生错误"));
                // } 
                // else {
                //         var mistakes = [];
                //         mistakes.push(user_id)                  
                // }
//             })
//         })
//         users.insert(mistakes,function (e,doc){
//             if (e){
//                 reject(new Error("在 users 表中插入新用户数据时发生错误"))
//             }
//             else {
//                 resolve(mistakes);
//             }
//         })                       
//         resolve(mistakes);
//     })
    
// };


module.exports = {
    addQuestion,
    getQuestions,
    getMyUserInfo,
    updateMyUserInfo,
    getMistakes
}