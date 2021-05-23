const mongoose = require('mongoose')

const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    reauired: true
  },
  name_en: {
    type: String,
    reauired: true
  },
  category: {
    type: String,
    reauired: true
  },
  image: {
    type: String,
    reauired: true
  },
  location: {
    type: String,
    reauired: true
  },
  phone: {
    type: String,
    reauired: true
  },
  google_map: {
    type: String,
    reauired: true
  },
  rating: {
    type: Number,
    reauired: true
  },
  description: {
    type: String,
    reauired: true
  } 
})
module.exports = mongoose.model('Restaurant', restaurantSchema)