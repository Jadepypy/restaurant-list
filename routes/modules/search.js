const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) =>{
  const keyword = req.query.keyword

  return Restaurant.find({'name': {'$regex': keyword, $options: 'i'}})
    .lean()
    .then((searchResult) => res.render('index', {restaurants: searchResult, keyword: keyword}))
    .catch((error) => console.log(error))
})

module.exports = router