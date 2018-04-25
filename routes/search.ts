import iShadow from "../ShadowMS/types/basic"
import Route from "../ShadowMS/classes/Route"
import toPromise from "../ShadowMS/functions/toPromise"
import stringToNumArray from "../ShadowMS/functions/stringToNumArray"
import { isUndefined } from "util"

const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const slides = require("./data/slides")

const filterData = filter => data =>
	data.filter(el => filter.test(el.Body) || filter.test(el.Title))

const formatData = formater => data =>
	data.map(el => {
		el.Body = formater(el.Body)
		return el
	})

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

const formatDate = async (posts: any[]) =>
	posts.map(post => {
		let daySuffix
		const Date = (post.Date.split(",").length <= 1
			? post.Date.split(" ").slice()
			: post.Date.split(",").slice()
		).filter(Boolean)
		console.dir(Date, { colors: true })
		const day = Date[2]
		const formattedPost = {
			...post._doc
		}
		if (day === 1 || day - Math.floor(day / 10) * 10 === 1) daySuffix = "st"
		else if (day === 2 || day - Math.floor(day / 10) * 10 === 2)
			daySuffix = "nd"
		else if (day === 3 || day - Math.floor(day / 10) * 10 === 3)
			daySuffix = "rd"
		else daySuffix = "th"
		formattedPost.Date = `${Date[1]} ${Date[2] + daySuffix} ${Date[0]}`
		return formattedPost
	})

const handlerConstructor = (data: iShadow.LooseObject) =>
	router.get("/", (req, res, next) => {
		let pst
		const filter = new RegExp(req.query["filter"], "g")
		const order = req.query["order"]
		const recived = Object.assign({}, data)
		const ds = [...recived.Post]
		toPromise(data.Post)
			.then(filterData(filter))
			.then(data => data.sort(sortData(order)))
			.then(formatDate)
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
					message: "Post not found",
					error: err
				})
			})
	})

export default new Route("/search", handlerConstructor)
