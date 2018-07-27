var express = require('express');
var router = express.Router();
var dbActions = require('../utils/dbActions');

var {
    getCases,
    addCases,
    editCases,
    deleteCases
  } = dbActions

router.get('/', async function(req, res, next) {
    var cases = await getCases()
    console.log(cases)
    res.status(200).send({'cases':cases})
})

router.post('/', async function(req, res, next) {
    console.log(req.body)
    var newCase = await addCases(req.body)
    res.status(200).send({'newCase':newCase})
    // var category = await addCases(name,imageUrl)
    // res.status(200).send({'category':category})
})

router.post('/edit', async function(req, res, next) {
    console.log(req.body)
    var cases = await editCases(req.body)
    res.status(200).send({'cases':cases})
})

router.post('/delete', async function(req, res, next) {
    // console.log("id:"+_id)
    var cases = await deleteCases(req.body)
    res.status(200).send({'cases':cases})
})
// router.post('/edit', async function(req, res, next) {
//     console.log(req.body)
//     var _id = req.body._id
//     var name = req.body.name
//     var imageUrl = req.body.imageUrl
//     var category = await editCategories(_id,name,imageUrl)
//     res.status(200).send({'category':category})
// })

// router.post('/delete', async function(req, res, next) {
//     console.log(req.body)
//     var _id = req.body.id
//     // console.log("id:"+_id)
//     var category = await deleteCategories(_id)
//     res.status(200).send({'category':category})
// })

module.exports = router;