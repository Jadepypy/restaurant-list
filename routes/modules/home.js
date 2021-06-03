//首頁路由模組

const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({_id: 'asc'})
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.log(error))
})

module.exports = router