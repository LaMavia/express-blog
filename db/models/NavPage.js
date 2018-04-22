// import { Mongoose } from "mongoose";

const mongoose = require('mongoose') 
/**
 * @type {mongoose.Schema}
 */
const NAVPAGE_SCHEMA = new mongoose.Schema({
  Name: String,
  Href: String
})

/**
 * 
 * @param {mongoose.Connection} db 
 * @returns {mongoose.Model}
 */
module.exports = (db) => db.model("NavPage", NAVPAGE_SCHEMA, "nav-pages")
