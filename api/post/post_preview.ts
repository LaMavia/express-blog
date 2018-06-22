import iShadow from "../../ShadowMS/types/basic"
import Models from "../../ShadowMS/types/models"
import APIRoute from "../../ShadowMS/classes/APIRoute"
import formatPages from "../../ShadowMS/functions/formatPages"
import userRenderProps from "../../ShadowMS/functions/userRenderProps"

import * as mdInit from "markdown-it"
// import * as mongoose from "mongoose"

const md = mdInit({
	html: true,
	linkify: true,
	typographer: true
})
	.use(require("markdown-it-footnote"))
	.use(require("markdown-it-imsize"))


const handlerConstructor = (Shadow: iShadow.App) =>
(req, res, next) => {
	const post: Models.Post = req.body
	post.Body = md.render(post.Body)
	const author = null
	res.render("post", {
		title: "[Preview] Express",
		home: Shadow.data.origin,
		pages: formatPages(Shadow.data, "NavPage"),
		post,
		author,
		user: userRenderProps(req.cookies["UserID"], Shadow.data["User"])
	})
}
export default new APIRoute("POST", "/preview", handlerConstructor)
