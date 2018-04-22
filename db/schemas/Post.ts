import * as mongoose from "mongoose";
import Schema from "../../ShadowMS/classes/Schema"

const POST_SCHEMA = new mongoose.Schema({
	Title: String,
	Tags: [String], 
	Desc: String,
	Img: String,
	Body: String,
	Author: String,
	Date: String
})

export default new Schema("Post", POST_SCHEMA, "posts")


