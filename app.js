const express = require("express")
const path = require("path")
const favicon = require("serve-favicon")
const logger = require("morgan")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const stylus = require("stylus")
const sass = require('node-sass')
const sassMiddleware = require('node-sass-middleware');
const mongoose = require("mongoose")
const fs = require("fs") 
const compression = require("compression")

// HELPERS
const formatItem = require("./helpers/formatItem")
const writeToJSON = require("./helpers/debug/writeToJSON")
const wait = require("./helpers/debug/wait")

// DB
mongoose.set("debug", true)
const db = require("./db/")
const { Post } = db.models
const pages = require('./routes/data/pages')
// Routes
const index  = require("./routes/index")
const users  = require("./routes/users")
const posts  = require("./routes/post")
const search = require("./routes/search")
// Api handlers

// App
const app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(
// 	stylus.middleware({
// 		dest: path.join(__dirname, "public/css"),
// 		src: path.join(__dirname, "public/stylus")
// 	})
// )
app.use(
	sassMiddleware({
		/* Options */
		src: path.join(__dirname, "public/scss"),
		// file: 'style.scss',
		dest: path.join(__dirname, "public/css"),
		debug: true,
		// outputStyle: "compressed",
		prefix: "/css" // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
	})
)
app.use(express.static(path.join(__dirname, "public")))
app.use(compression({ filter: (req, res) => {
	return req.headers['x-no-compression']
		? false
		: compression.filter(req, res)
} }))

app.use("/", index)
app.use("/users", users)
app.use("/posts", posts)
app.use("/search", search)

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

module.exports = app
