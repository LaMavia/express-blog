const mongoose = require("mongoose")
const mongodb = require("mongodb")
const _NavPage = require("../../db/models/NavPage")
const db = require('../../db')
/**
 * 
 * @param {mongoose.Connection} db 
 */
module.exports = (async () => {
  const NavPage = db.models.NavPage
  let Origin
  db.origin.then(d => Origin = d.Origin)

  return await NavPage.find()
    .then(res => 
      Array.from(res)
        .map(page => ({
          Name: page.Name,
          Href: `${Origin}${page.Href}`
        })))
})()