const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')

const port = 3000

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// setting static files, generating routes
app.use(express.static('public'))

app.get('/', (req, res) =>{
  res.render('index', {restaurants: restaurants.results})
})
app.get('/restaurants/:id', (req, res) =>{
  const restaurant = restaurants.results.find((item) => item.id.toString() === req.params.id)
  res.render('show', {restaurant: restaurant})
})
app.get('/search', (req, res) =>{
  const keyword = req.query.keyword
  const searchResult = restaurants.results.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', {restaurants: searchResult, keyword: keyword})
})

app.listen(port, () =>{
  console.log(`Express is running on http:/localhost:${port}`)
})