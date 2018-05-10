import iShadow from "../ShadowMS/types/basic"
import Models from "../ShadowMS/types/models"
import Route from "../ShadowMS/classes/Route"
import formatPages from "../ShadowMS/functions/formatPages"
import userRenderProps from "../ShadowMS/functions/userRenderProps"

import * as express from "express"
import * as mdInit from "markdown-it"
// import * as mongoose from "mongoose"


const md = mdInit({
	html: true,
	linkify: true,
	typographer: true
})
	.use(require("markdown-it-footnote"))
	.use(require("markdown-it-imsize"))

const router = express.Router()
const slides = require("./data/slides")

const handlerConstructor = (Shadow: iShadow.App) =>
	router.get("/:id", (req, res, next) => {
		const data = Shadow.data
		const id = req.params["id"]
		const post: Models.Post = data.Post.find(pst => pst._id.toString() === id)

		if (!post) {
			next("Post not found")
			res.render("error", {
				message: "Post not found",
				error: "Post not found"
			})
		}
		else {
			post.Body = md.render(post.Body)
			const author = Shadow.data["User"].find( 
				(user: Models.User) => user.Name === post.Author 
			)
			res.render("post", {
				title: "Express",
				home: data.origin,
				pages: formatPages(data, "NavPage"),
				header: { slides: JSON.stringify(slides) },
				post,
				author,
				user: userRenderProps(req.cookies["UserID"], Shadow.data["User"])
			})
		}
	})

export default new Route("/posts/", handlerConstructor)
