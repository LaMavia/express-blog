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

const sortData = order => {
  let foo;
  switch(order.toLowerCase()) {
    case "newest": foo = (a, b) => a.Date - b.Date; break;
    case "oldest": foo = (a, b) => b.Date - a.Date; break;
    default: foo = (a, b) => a.Date - b.Date; break;
  }
  return foo
}

const intArrDate = posts => posts.map(post => {
  post.Date = post.Date.split(" ").map(Number)
  return post
})

const formatDate = posts => posts.map(post => {
  let daySuffix
  const Date = Date.slice().split(",")
  const day = Date[1]
  if     (day === 1 || day - Math.floor(day/10) * 10 === 1) daySuffix = "st"
  else if(day === 2 || day - Math.floor(day/10) * 10 === 2) daySuffix = "nd"
  else if(day === 3 || day - Math.floor(day/10) * 10 === 3) daySuffix = "rd"
  else daySuffix = "th"
  post.Date = `${Date[1]} ${Date[2] + daySuffix} ${Date[0]}`
  return post
})

router.get("/", async (req, res, next) => {
	let pst
  const filter = new RegExp(req.query['filter'], 'g')
  const order = req.query['order']

  await Post.find()
  .then(filterData(filter))
  // .then(formatData(marked))
  // .then(intArrDate)
  .then(data => data.sort(sortData(order)))
  // .then(formatDate)
	.then(data => {
		res.render("search", {
			title: `Results for: "${req.query['filter']}"`,
      home: "http://localhost:3000/",
      filter: req.query['filter'],
      posts: data,
      slides,
			pages: []
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