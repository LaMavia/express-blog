const express = require("express")
const axios = require("axios")
const router = express.Router()
const db = require("../db")
const { Post } = db.models
const pages = require("./data/pages")

/* GET home page. */
router.get("/", async (req, res, next) => {
	const posts = await Post.find()
		.then(res => 
			Array.from(res)
			// console.dir(res.data, { colors: true })
		)
		.catch(err => {
			console.dir(err, { colors: true })
			return next(err)
		})
	res.render("index", {
		title: "Express",
		pages,
		home: "http://localhost:3000/",
		header: {
			slides: require("./data/slides")
		},
		pinnedList: require("./data/pinned"),
		posts
	})
})

module.exports = router

// post: {
//   Author: "Illuminati",
//   Date: "03/14/2018",
//   Tags: ["math", "pi"].join(', ')
// },
