var express = require('express');
var router = express.Router();
var dbActions = require('../utils/dbActions');

var {
    getCategories,
    addCategories,
    editCategories,
    deleteCategories
  } = dbActions

router.get('/', async function(req, res, next) {
    var categories = await getCategories()
    res.status(200).send({'categories':categories})
})

router.post('/', async function(req, res, next) {
    console.log(req.body)
    var name = req.body.name
    var imageUrl = req.body.imageUrl
    var category = await addCategories(name,imageUrl)
    res.status(200).send({'category':category})
})

router.post('/edit', async function(req, res, next) {
    console.log(req.body)
    var _id = req.body._id
    var name = req.body.name
    var imageUrl = req.body.imageUrl
    var category = await editCategories(_id,name,imageUrl)
    res.status(200).send({'category':category})
})

router.post('/delete', async function(req, res, next) {
    console.log(req.body)
    var _id = req.body.id
    // console.log("id:"+_id)
    var category = await deleteCategories(_id)
    res.status(200).send({'category':category})
})

module.exports = router;