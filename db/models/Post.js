// import { Mongoose } from "mongoose";

const mongoose = require('mongoose') 
const POST_SCHEMA = new mongoose.Schema({
	Title: String,
	Tags: [String], 
	Desc: String,
	Img: String,
	Body: String,
	Author: String,
	Date: String
})

module.exports =  (db) => db.model("Post", POST_SCHEMA, "posts")
