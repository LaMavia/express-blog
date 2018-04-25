import * as mongoose from "mongoose"
import * as fs from "fs-extra"

import Post from "./schemas/Post"
import NavPage from "./schemas/NavPage"

const parse = d => {
	const l = JSON.parse(d)
	return l
}

// Setting up MongoDB
mongoose
	.connect("mongodb://localhost:27017/true-blog")
	.then(() => console.info("Connected"))
	.catch(err => console.error(err))
const db = mongoose.connection

export default db

export const schemas = [Post, NavPage]
