import iShadow from "../ShadowMS/types/basic"
import Route from "../ShadowMS/classes/Route"
import toPromise from "../ShadowMS/functions/toPromise"
import stringToNumArray from "../ShadowMS/functions/stringToNumArray"
import formatDate from "../ShadowMS/functions/formatDate"

const express = require("express")
const router = express.Router()
const slides = require("./data/slides")

const filterData = filter => data =>
	data.filter(el => filter.test(el.Body) || filter.test(el.Title))

// const formatData = formater => data =>
// 	data.map(el => {
// 		el.Body = formater(el.Body)
// 		return el
// 	})

const sortData = (order: string) => {
	let foo
	switch (order.toLowerCase()) {
		case "newest":
			foo = (a, b) =>
				stringToNumArray(a.Date, " ")[1] - stringToNumArray(b.Date, " ")[1]
			break
		case "oldest":
			foo = (a, b) =>
				stringToNumArray(b.Date, " ")[1] - stringToNumArray(a.Date, " ")[1]
			break
		default:
			foo = (a, b) =>
				stringToNumArray(a.Date, " ")[1] - stringToNumArray(b.Date, " ")[1]
			break
	}
	return foo
}

const handlerConstructor = (Shadow: iShadow.App) =>
	router.get("/", (req, res) => {
		const data = Shadow.data
		const filter = new RegExp(req.query["filter"], "g")
		const order = req.query["order"]
		toPromise(data.Post)
			.then(filterData(filter))
			.then(data => data.sort(sortData(order)))
			.then(data => data.map(formatDate))
			.then(posts => {
				res.render("search", {
					title: `Results for: "${req.query["filter"]}"`,
					home: data.origin,
					filter: req.query["filter"],
					posts,
					slides,
					pages: data.NavPage
				})
			})
			.catch(err => {
				console.error("Ya had an ERROR :)")
				res.render("error", {
					message: "Posts not found",
					error: err
				})
			})
	})

export default new Route("/search", handlerConstructor)
