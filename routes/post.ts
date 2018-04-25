import iShadow from "../ShadowMS/types/basic"
import Route from "../ShadowMS/classes/Route"
import formatPages from "../ShadowMS/functions/formatPages"

import * as express from "express"
import * as mdInit from "markdown-it"
import * as mongoose from "mongoose"


const md = mdInit({
	html: true,
	linkify: true,
	typographer: true
})
	.use(require("markdown-it-footnote"))
	.use(require("markdown-it-imsize"))

const router = express.Router()
const slides = require("./data/slides")

const handlerConstructor = (data: iShadow.LooseObject) =>
	router.get("/:id", (req, res, next) => {
		const id = req.params["id"]
		const post = data.Post.find(pst => pst._id.toString() === id)
		if (!post) {
			next("Post not found")
			res.render("error", {
				message: "Post not found",
				error: "Post not found"
			})
		}
		else {
			post.Body = md.render(post.Body)
			res.render("post", {
				title: "Express",
				home: data.origin,
				pages: formatPages(data, "NavPage"),
				header: { slides: JSON.stringify(slides) },
				post
			})
		}
	})

export default new Route("/posts/", handlerConstructor)