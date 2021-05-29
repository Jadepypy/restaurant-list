const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true})

const port = 3000
const db = mongoose.connection


db.on('error', () => {
  console.log('mongodb roor!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// setting static files, generating routes
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) =>{
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', {restaurants: restaurants}))
    .catch(error => console.log(error))
})
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
app.get('/restaurants/:id', (req, res) =>{
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', {restaurant}))
    .catch((error) => console.log(error))
})
app.get('/search', (req, res) =>{
  const keyword = req.query.keyword
  const searchResult = restaurants.results.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', {restaurants: searchResult, keyword: keyword})
})
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const address = req.body.address
  const phone = req.body.phone
  const image = req.body.image
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.create({category, address, phone, image, rating,description})
            .then(() => res.redirect('/'))
            .catch(error => console.log(error))

})

app.listen(port, () =>{
  console.log(`Express is running on http:/localhost:${port}`)
})