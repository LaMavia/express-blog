"using strict"
import iShadow from "../ShadowMS/types/basic"
import Models from "../ShadowMS/types/models"
import Route from "../ShadowMS/classes/Route"
import toPromise from "../ShadowMS/functions/toPromise"
import stringToNumArray from "../ShadowMS/functions/stringToNumArray"
import formatDate from "../ShadowMS/functions/formatDate"

const express = require("express")
const router = express.Router()
const slides = require("./data/slides")

// : (filter: RegExp) => (data: Models.IPost[]) => Models.IPost[] 
const filterData = filter => data =>
	data.filter(el => filter.test(el.Body) || filter.test(el.Title))

// const formatData = formater => data =>
// 	data.map(el => {
// 		el.Body = formater(el.Body)
// 		return el
// 	})

const sortData = (order: string) => {
	let foo
	const convertToDate = 
		(post: iShadow.LooseObject): Date => 
			new Date(...stringToNumArray(post.Date, " "))

	switch (order.toLowerCase()) {
		case "newest":
			foo = (a, b) =>
				convertToDate(b) - convertToDate(a)
			break
		case "oldest":
			foo = (a, b) =>
				convertToDate(a) - convertToDate(b)
			break
		default:
			foo = (a, b) =>
				convertToDate(a) - convertToDate(b)
			break
	}
	return foo
}

const handlerConstructor = (Shadow: iShadow.App) =>
	router.get("/", (req, res) => {
		const data = Shadow.data
		const filter = new RegExp(req.query["filter"], "g")
		const order = req.query["order"]
		toPromise(data.Post as Models.IPost)
			.then(filterData(filter))
			.then(data => data.sort(sortData(order)))
			.then(data => data.map(formatDate))
			.then((posts: Models.IPost[]) => {
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
