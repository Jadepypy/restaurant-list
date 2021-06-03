const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

const port = 3000

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// setting static files, generating routes
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(routes)

app.get('/search', (req, res) =>{
  const keyword = req.query.keyword
  const searchResult = restaurants.results.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', {restaurants: searchResult, keyword: keyword})
})

app.listen(port, () =>{
  console.log(`Express is running on http:/localhost:${port}`)
})