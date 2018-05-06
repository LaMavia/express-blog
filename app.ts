import * as favicon from "serve-favicon"
import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as sassMiddleware from 'node-sass-middleware'
import * as express from "express"
import * as compression from 'compression'
import * as dotenv from 'dotenv'

const _env = process.env["NODE_ENV"] || "dev"

if(_env === "production") dotenv.config()
else dotenv.config({path: "../dev.env"}) 

// HELPERS
// const formatItem = require("./helpers/formatItem")
// const writeToJSON = require("./helpers/debug/writeToJSON")
// const wait = require("./helpers/debug/wait")

// Routes
import index from "./routes/index"
import post from "./routes/post"
import search from "./routes/search"
import login from "./routes/login"
import logout from "./routes/logout"
import user from "./routes/user"

// APIRoutes
import posts from "./api/get/posts"
import AddPost from "./api/post/post"
import AddUser from "./api/post/user"
import APILogin from "./api/post/login"

import db, { schemas } from "./db"
import iShadow from "./ShadowMS/types/basic"
import Shadow from "./ShadowMS/index"

const middleware = [
	favicon(path.join(__dirname, "public", "favicon.ico")),
	// logger("dev"),
	bodyParser.json(),
	bodyParser.urlencoded({ extended: false }),
	cookieParser(),
	sassMiddleware({
		src: path.join(__dirname, "public/scss"),
		// file: 'style.scss',
		dest: path.join(__dirname, "public/css"),
		debug: true,
		outputStyle: "compressed",
		prefix: "/css" // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
	}),
	express.static(path.join(__dirname, "public")),
	compression({
		filter: (req: any, res: any) => {
			return req.headers["x-no-compression"]
				? false
				: compression.filter(req, res)
		}
	})
]
const routes: iShadow.Route[] = [
	index,
	post,
	search,
	login,
	logout,
	user 
]
const apiRoutes: iShadow.APIRoute[] = [
	posts,
	AddPost,
	AddUser,
	APILogin
]
const catchHandler = (err => new Error(err))
const app = new Shadow(3000, db, schemas, middleware, routes, apiRoutes, catchHandler)

// App
/**
app.get("/api/posts", (req, res, next) => {
	Post.find()
		.then(data => {
			if(data.length === 0) res.sendStatus(404)
			res.statusCode = 200
			res.type("application/json")
			res.send(JSON.stringify(data))
		})
		.catch(console.error)
})
app.get("/api/filtered", async (req, res) => {
	await Post.find()
		.then(data => {
			const fltr = new RegExp(req.query.filter, 'g')
			const filtered = data.filter(post => {
				return fltr.test(post.Title)
			})
			res.statusCode = 200
			res.type("application/json")
			res.send( JSON.stringify(filtered.map(formatItem)) )
		})
		.catch(err => {
			console.error(err)
		})
})

app.post("/api/add/post", (req, res) => {
	const reqKeys = Object.keys(req.body).sort()
	const properKeys = Object.keys({
		Title: "",
		Tags: [],
		Desc: "",
		Img: "",
		Body: "",
		Author: "",
		Date: ""
	}).sort()
	res.set('Content-Type', 'application/json')
	if(!( JSON.stringify(reqKeys) === JSON.stringify(properKeys) )) {
		// Error / Rejection Handler
		res.statusCode = 400
		res.send({"Response": "You got rejected!"})
	} else {
		const newPost = new Post(req.body).save()
		res.send({"Response": "Saved to DB :)"})
	}
	console.dir(req.body, {colors: true})
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error("Not Found")
	err.status = 404
	next(err)
})

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get("env") === "development" ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render("error")
})
*/
module.exports = app.app

