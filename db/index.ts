import * as mongoose from "mongoose"

import Post from "./schemas/Post"
import NavPage from "./schemas/NavPage"
import User from "./schemas/User"

const dbLink = String(process.env["DB_LINK"])
// Setting up MongoDB
mongoose
	.connect(dbLink)
	.then(() => console.info("Connected"))
	.catch(err => console.error(err))
const db = mongoose.connection

export default db

export const schemas = [Post, NavPage, User]
