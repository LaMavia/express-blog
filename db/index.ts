import * as mongoose from "mongoose"

import Post from "./schemas/Post"
import NavPage from "./schemas/NavPage"
import User from "./schemas/User"

const dbLink = String(process.env["DB_LINK"])
// Setting up MongoDB
console.info("🕕 Connecting to the Database")
mongoose
	.connect(dbLink)
	.then(() => {console.info("✔️ Connected to the Database")})
const db = mongoose.connection

export default db

export const schemas = [Post, NavPage, User]
