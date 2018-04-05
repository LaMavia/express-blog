const express = require("express")
const md =require('markdown-it')({
  html: true,
  linkify: true,
	typographer: true
})

const mongoose = require('mongoose')
const router = express.Router()
const db = require("../db")
const { Post } = db.models
const pages  = require("./data/pages")
const slides = require('./data/slides')

/* GET home page. */
router.get("/:id", async (req, res, next) => {
	let pst
	const id = req.params['id']
	Post.findById(id)
	.then(data => {
		data.Body = md.render(data.Body)
		console.dir(data.Body, {colors: true})
		res.render("post", {
			title: data.Title,
			home: "http://localhost:3000/",
			pages,
			header: {
				slides: JSON.stringify(slides) 
			},
			post: data
		})
	})
	.catch(err => {
		console.error("Ya had an ERROR :)")
    res.render("error", {
      message: "Post not found",
      error: err
    })
	})
})

module.exports = router