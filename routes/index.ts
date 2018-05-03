import * as express from "express"
const router = express.Router()

import iShadow from "../ShadowMS/types/basic"
import Route from "../ShadowMS/classes/Route"
import formatDate from "../ShadowMS/functions/formatDate"

const randomItems = (arr: any[], n: number) => {
	const output = []
	for (let i = 0; i < arr.length && output.length <= n; i++) {
		// @ts-ignore
		output.push(arr[Math.floor(Math.random() * arr.length)])
	}
	return output 
}

const handlerConstructor = (Shadow: iShadow.App) =>
	router.get("/", (req, res) => {
		console.dir(req.baseUrl, {colors: true})
		const data = Shadow.data
		const pages = data.NavPage.map(page => ({
			Name: page.Name,
			Href: `${data.origin}${page.Href}`
		}))

		const posts: any[] = data["Post"].map(formatDate)
		const pinnedList: any[] = randomItems(posts, 3)
		

		res.render("index", {
			title: "Express",
			pages,
			home: data.origin,
			header: {
				slides: require("./data/slides")
			},
			pinnedList,
			posts
		})
	})

export default new Route("/", handlerConstructor)