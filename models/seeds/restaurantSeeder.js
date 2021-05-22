const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantData = require('../../restaurant.json')


mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb errot!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let r of restaurantData.results){
    Restaurant.create({
      name: r.name,
      name_en: r.name_en,
      category: r.category,
      image: r.image,
      location: r.location,
      phone: r.phone,
      google_map: r.google_map,
      rating: r.rating,
      description: r.description
    })
  }
  console.log('done')

})
