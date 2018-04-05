const db = require('../../db')
const Post = db.models.Post

module.exports = ( () => {
  let data = []
  Post.find()
    .then(res => {
      for(let i = 0; i < res.length && data.length < 3; i++) {
        data.push(res[i])
      }
    })
    .catch(err => {
      setTimeout(() => console.error(new Error(err)), 0)
      data = []
    })

  return data
})()