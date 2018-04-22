const mongoose = require("mongoose")
const fs = require("fs-extra")
/**
 *
 * @param {String} path
 */
const parse = d => {
	const l = JSON.parse(d)
	return l
}
// const local = (async () => await .catch(err => new Error(err)))()

// Setting up MongoDB
mongoose
	.connect("mongodb://localhost:27017/true-blog")
	.then(() => console.info("Connected"))
	.catch(err => console.error(err))
const db = mongoose.connection
import Post from "./schemas/Post"
import NavPage from "./schemas/NavPage"

export default db
export const origin = fs
	.readFile("./db/local.json", { encoding: "utf-8" })
	.then(parse)
export const schemas = [Post, NavPage]
