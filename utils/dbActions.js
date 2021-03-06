var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/tech');
//注意修改数据库名称


var categories = db.get('categories')
var cases = db.get('cases')

var addCategories = function( name,imageUrl) {
    return new Promise(function(resolve, reject){
        var newCategory = {
            name: name,
            imageUrl: imageUrl
        }
        categories.insert(newCategory, function (e, doc) {
            if (e) {
                reject(new Error("向 categoryies表中插入数据时发生错误"));
            }
            else {
                resolve(doc)
                console.log('成功插入')
                //这里的 doc 是 records 表中新插入的这一条记录
            }
        })
    })
}

var addCases = function( newCase) {
    return new Promise(function(resolve, reject){
        cases.insert(newCase, function (e, doc) {
            if (e) {
                reject(new Error("向 cases表中插入数据时发生错误"));
            }
            else {
                resolve(doc)
                console.log('成功插入')
                //这里的 doc 是 records 表中新插入的这一条记录
            }
        })
    })
}

var getCategories = function(){
        return new Promise(async (resolve,reject) => {
            const data = await categories.find().catch((error) => {
                reject(new Error("查找 categories 表时发生错误", error))
            })
            resolve(data)
        })
}

var getCases = function(){
    return new Promise(async (resolve,reject) => {
        const data = await cases.find().catch((error) => {
            reject(new Error("查找 cases 表时发生错误", error))
        })
        resolve(data)
    })
}

var editCategories = function(_id,name,imageUrl){
    return new Promise(async (resolve,reject) => {
        var newCategory = {
            id: _id,
            name: name,
            imageUrl: imageUrl
        }
        console.log('newCategory')
        console.log(newCategory)
        const data = await categories.update(newCategory.id,{"name":newCategory.name,"imageUrl":newCategory.imageUrl}).catch((error) => {
            reject(new Error("编辑 categories 表时发生错误", error))
        })
        console.log("编辑成功")
        resolve(data)
    })
}

var editCases = function(newCase){
    return new Promise(async (resolve,reject) => {
        console.log('newCase')
        console.log(newCase)
        const data = await cases.update(newCase.id,{"name":newCase.name,"customer":newCase.customer,"category":newCase.category,"caseImageUrl":newCase.caseImageUrl,"imageUrl":newCase.imageUrl,"introduce":newCase.introduce,"images":newCase.images}).catch((error) => {
            reject(new Error("编辑 cases 表时发生错误", error))
        })
        console.log("编辑成功")
        resolve(data)
    })
}

var deleteCategories = function(_id){
    return new Promise(async (resolve,reject) => {
        const data = await categories.remove({"_id":_id}).catch((error) => {
            reject(new Error("删除 categories 表时发生错误", error))
        })
        console.log("删除成功")
        resolve(data)
    })
}

var deleteCases = function(newCase){
    return new Promise(async (resolve,reject) => {
        const data = await cases.remove({"_id":newCase.id}).catch((error) => {
            reject(new Error("删除 cases 表时发生错误", error))
        })
        console.log("删除成功")
        resolve(data)
    })
}

// var deleteQuestion = function(_id){
//     return new Promise(async (resolve,reject) => {
//         const data = await questions.remove({"_id":_id}).catch((error) => {
//             reject(new Error("删除 questions 表时发生错误", error))
//         })
//         console.log("删除成功")
//         resolve(data)
//     })
// };

// var editQuestion = function(newQuestion){
//     console.log("newQuestion")
//     console.log(newQuestion)
//     var options = []
//     if(newQuestion.optionA){
//         var obj = {}
//         obj.title = newQuestion.optionA
//         obj.index = "A"
//         if(newQuestion.answer.indexOf(obj.title)!= -1){
//             obj.isAnswer = true
//         } else {
//             obj.isAnswer = false
//         }
//         options.push(obj)
//     }
//     if(newQuestion.optionB){
//         var obj = {}
//         obj.title = newQuestion.optionB
//         obj.index = "B"
//         if(newQuestion.answer.indexOf(obj.title)!= -1){
//             obj.isAnswer = true
//         } else {
//             obj.isAnswer = false
//         }
//         options.push(obj)
//     }
//     if(newQuestion.optionC){
//         var obj = {}
//         obj.title = newQuestion.optionC
//         obj.index = "C"
//         if(newQuestion.answer.indexOf(obj.title)!= -1){
//             obj.isAnswer = true
//         } else {
//             obj.isAnswer = false
//         }
//         options.push(obj)
//     }
//     if(newQuestion.optionD){
//         var obj = {}
//         obj.title = newQuestion.optionD
//         obj.index = "D"
//         if(newQuestion.answer.indexOf(obj.title)!= -1){
//             obj.isAnswer = true
//         } else {
//             obj.isAnswer = false
//         }
//         options.push(obj)
//     }
//     if(newQuestion.optionE){
//         var obj = {}
//         obj.title = newQuestion.optionE
//         obj.index = "E"
//         if(newQuestion.answer.indexOf(obj.title)!= -1){
//             obj.isAnswer = true
//         } else {
//             obj.isAnswer = false
//         }
//         options.push(obj)
//     }
//     return new Promise(async (resolve,reject) => {
//         const data = await questions.update(newQuestion.question_id,{"title":newQuestion.question,"type":newQuestion.type,"options":options,"answer":newQuestion.answer.join()}).catch((error) => {
//             reject(new Error("编辑 questions 表时发生错误", error))
//         })
//         console.log("编辑成功")
//         resolve(data)
//     })
// }

// var getQuestionsList = function(name, page){
//     return new Promise(async (resolve,reject) => {
//         console.log("name:"+name)
//         console.log("page:"+page)
//         if(name) {
//             console.log("有搜索框内容:"+name)
//             var exp = new RegExp(name); 
//             const data = await questions.find({"title":exp}).catch((error) => {
//                 reject(new Error("查找 questions 表时发生错误", error))
//             })
//             resolve(data)
//             console.log(data.length)
//         }
//         else{
//             console.log("没有搜索框内容")
//             const data = await questions.find().catch((error) => {
//                 reject(new Error("查找 questions 表时发生错误", error))
//             })
//             resolve(data)
//             console.log(data.length)
//         }
        
        
//     })
// };

// var getMyUserInfo = function(user_id){
//     return new Promise(function(resolve,reject){
//         //暂时不做权限限制，只要知道 user_id 就可以获取用户数据
//         users.find({"user_id":user_id},{},async function (e,doc){
//             // if (e) {
//             //     res.send("查找数据时发生错误");
//             // } 
//             // else {
//                  if (doc.length == 0){
//                     var newUser = {
//                         "user_id":"raoyu0928",
//                         "openid": "openid1",
//                         "department":"前端开发",
//                         "avatarUrl":"",
//                         "name":"饶煜。",
//                         "records":[],
//                         "mistakes":[]
//                     }
//                     users.insert(newUser, function(e,doc){
//                         if(e){
//                             reject(new Error("在 users 表中插入新用户数据时发生错误"))
//                         }
//                         else {
//                             resolve(newUser)
//                         }
//                     })
//                 }
//                 else {
//                     var myUserInfo = doc[0];
//                     resolve(myUserInfo)
//                     // var myUserInfo = doc[0];
//                     // var mistakes = myUserInfo.mistakes;//成功返回错题id
//                     // mistakes.map(mistake => {
//                     //     questions.find({"_id":mistake},{},async function (e,doc){

//                     //     })
//                     // })
//                     // resolve(myUserInfo)
//                 }
            
//          })
//         })
//     }

// var updateMyUserInfo = function(user_id,myUserInfo) {
//         //这里更新的对象也应该是完整的 用户表数据 userInfo
//         return new Promise(function(resolve, reject){
//             users.update({"user_id":user_id},myUserInfo, function (e, doc) {
//                 if (e) {
//                     reject(new Error("这里更新数据时发生错误"));
//                 }
//                 else {
//                     resolve(doc);
//                 }
//             })
//         })
//     };

// var getMistakes = function(user_id){
//     return new Promise(async (resolve,reject) => {      
//         questions.find({"_id":user_id},{},function (e,doc){
//             if (e) {
//                 reject(new Error("查找user表数据时发生错误"));
//             } 
//             else {
//                 var mistakes = doc[0]
//                 resolve(mistakes)
//             }
//         })
//     })
// }

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
    getCategories,
    addCategories,
    editCategories,
    deleteCategories,

    addCases,
    getCases,
    editCases,
    deleteCases
}