// @ts-check
import * as express from "express"
const router = express.Router()

import iShadow from "../ShadowMS/types/basic"
import Route from "../ShadowMS/classes/Route"

const randomItems = (arr: any[], n: number) => {
	const output = []
	for (let i = 0; i < arr.length && output.length <= n; i++) {
		output.push(arr[Math.floor(Math.random() * arr.length)])
	}
	return output
}

const handlerConstructor = (data: iShadow.LooseObject) =>
	router.get("/", (req, res, next) => {

		const pages = data.NavPage.map(page => ({
			Name: page.Name,
			Href: `${data.origin}${page.Href}`
		}))

		const posts: any[] = data["Post"]
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

/* GET home page. */
const route = new Route("/", handlerConstructor)

export default route

// post: {
//   Author: "Illuminati",
//   Date: "03/14/2018",
//   Tags: ["math", "pi"].join(', ')
// },
