const express = require("express")
const marked = require('marked')
const mongoose = require('mongoose')
const router = express.Router()
const db = require("../db")
const { Post } = db.models
const pages  = require("./data/pages")
const slides = require('./data/slides')

const filterData = filter => data => 
  data.filter(el => filter.test(el.Body) || filter.test(el.Title))

const formatData = formater => data => data.map(el => {
  el.Body = formater(el.Body)
  return el
})

router.get("/", async (req, res, next) => {
	let pst
	const filter = new RegExp(req.query['filter'], 'g')
  await Post.find()
  .then(filterData(filter))
  // .then(formatData(marked))
	.then(data => {
		res.render("search", {
			title: `Results for: "${req.query['filter']}"`,
      home: "http://localhost:3000/",
      posts: data,
      slides,
			pages
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