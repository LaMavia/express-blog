const mongoose = require('mongoose')

// Setting up MongoDB
mongoose.connect("mongodb://localhost:27017/true-blog")
  .then(() => console.info("Connected"))
  .catch(err => console.error(err))
const db = mongoose.connection
const Post = require('./models/Post')(db)

module.exports = {
  db,
  models: {
    Post
  }
}