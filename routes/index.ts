// @ts-check
import * as express from"express"
const axios = require("axios")
const router = express.Router()
const db = require("../db")
// const { Post } = db.models
// const _pages = require("./data/pages")

import iShadow from '../ShadowMS/types/basic'
import Route from "../ShadowMS/classes/Route"

const handlerConstructor = (data: iShadow.LooseObject) => router.get("/", async (req, res, next) => {
	const pages = data.NavPage.map(page => ({
		Name: page.Name,
		Href: `${data.origin}${page.Href}`
	}))

	const posts = data["Post"] as any[]
	const pinnedList: any[3] = []
	for(let i = 0; i < posts.length && pinnedList.length < 3; i++) {
		pinnedList.push(posts[i])
	}

	res.render("index", {
		title: "Express",
		pages,
		home: "http://localhost:3000/",
		header: {
			slides: require("./data/slides")
		},
		pinnedList,
		posts
	})
})

/* GET home page. */
const route = new Route("/", handlerConstructor)

export default route

// post: {
//   Author: "Illuminati",
//   Date: "03/14/2018",
//   Tags: ["math", "pi"].join(', ')
// },
