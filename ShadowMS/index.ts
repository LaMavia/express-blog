import * as mongoose from "mongoose";
import * as express from "express"
import * as dotenv from "dotenv"
import { Url } from "url";

import iShadow from "./types/basic"

/**
 * @todo Add CMS routes \w handlers
 * @todo Rewrite app.js to ShadowMS app 
 */
const path = require("path")
const favicon = require("serve-favicon")
const logger = require("morgan")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const sass = require("node-sass")
const sassMiddleware = require("node-sass-middleware")
const compression = require("compression")

export default class Shadow {
	
	port: number
	db: mongoose.Connection
	dbSchemas: iShadow.Schema[]
	dbModels: iShadow.Models
	middleware: express.RequestHandler[]
	app: express.Express
	routes: iShadow.Route[]
	host: string
	APIRoutes: iShadow.APIRoute[]
	CatchHandler: iShadow.CatchHandler
	env: dotenv.DotenvResult
	data: iShadow.LooseObject

	constructor(
		port: number, 
		dbConnection: mongoose.Connection, 
		dbSchemas: iShadow.Schema[], 
		middleware: express.RequestHandler[], 
		routes: iShadow.Route[], 
		APIRoutes: iShadow.APIRoute[],
		CatchHandler: iShadow.CatchHandler
	) {
		this.db = dbConnection
		this.dbSchemas = dbSchemas
		this.dbModels = {}

		this.port = port
		this.middleware = middleware
		this.routes = routes
		this.APIRoutes = APIRoutes
		this.host = ""
		this.data = {}

		this.CatchHandler = CatchHandler

		this.app = express()

		this.Init(this.port)
	}

	InitMiddleware() {
		this.middleware.forEach(( mdw: express.RequestHandler ) => {
			this.app.use(mdw)
		})
	}

	InitRoutes() {
		this.routes.forEach(( route: iShadow.Route ) => {
			const passedData = Object.freeze(Object.assign({}, this.data))
			this.app.use(route.path, route.handler(passedData))
		})
	}

	InitAPI() {
		this.APIRoutes.forEach((route: iShadow.APIRoute) => {
			const handler = route.handler(this.dbModels)
			switch(route.method) {
				case "GET"   : this.app.get   (route.path, handler);break;
				case "POST"  : this.app.post  (route.path, handler);break;
				case "PUT"   : this.app.put   (route.path, handler);break;
				case "DELETE": this.app.delete(route.path, handler);break;
				default:/* [*] */;break;
			}
		}, this)
	}

	InitModels() {
		this.dbSchemas.forEach(
			(schema: iShadow.Schema) => {
				this.dbModels[schema.name] = 
					this.db.model(schema.name, schema.schema, schema.collection)
			}, this
		)
	}

	Init(port: number) {

		this.app.set("views", path.join(__dirname, "..","views"))
		this.app.set("view engine", "pug")
		dotenv.config()
		this.data.origin = process.env["HOST"]
		this.data.sharedMethods = {
			GetFromDB: this.GetFromDB.bind(this)
		}

		this.InitMiddleware()
		this.InitAPI()
		this.InitModels()
		this.UpdateData()

		this.InitRoutes()
		console.info("\x1b[36m%s\x1b[0m"," Ready for Action 👊")
		console.dir(this.data, { colors: true })
		
	}

	// DataBase Methods
	async GetFromDB(modelName: string, conditions: iShadow.LooseObject = {}) {
		let out = null
		await this.dbModels[modelName].find(conditions)
			.then ( d   => out = d        )
			.catch( err => new Error(err) )
		return out
	}

	async UpdateDB(
		modelName: string, 
		query: iShadow.LooseObject, 
		data: iShadow.LooseObject, 
	) {
		let output: any
		await this.dbModels[modelName].findOneAndUpdate(query, data)
			.then(res => output = res)
			.catch(err => output = err)
		return output
	}

	async DeleteFromDB(
		modelName: string, 
		query: iShadow.LooseObject, 
		single: boolean
	)	{
		let output
		let operation: () => mongoose.Query<any>
		if(single) 
			operation = this.dbModels[modelName].deleteOne.bind(this, query)
		else 			 
			operation = this.dbModels[modelName].deleteMany.bind(this, query)
		await operation()
			.then(res => output = res)
			.catch(err => output = err)
		return output
	}

	// Data Methods
	/**
	 * @description Fetches data from data base and saves to ```this.data```
	 */
	async UpdateData(...modelNames: string[]) {
		if(modelNames.length > 0) {
			await	modelNames.forEach(async (modelName: string) => {
				await this.dbModels[modelName].find()
					.then(res => this.data[modelName] = res)
					.catch(this.CatchHandler)
			}, this)
		} else { // Updates everything
			for(const modelName in this.dbModels) {
				await this.dbModels[modelName].find()
					.then(res => this.data[modelName] = res)
					.catch(this.CatchHandler)
			}
		} 
	}

}
/*for(let prop in Shadow.prototype.app.prototype) {
	// @ts-ignore
	Shadow.prototype[prop] = 
		typeof Shadow.prototype.app.prototype[prop] === "function"
		? Shadow.prototype.app.prototype[prop].bind(Shadow.prototype.app)
		: Shadow.prototype.app.prototype[prop]
}*/
// module.exports = Shadow

/**
 * Default middleware *
	favicon(path.join(__dirname, "public", "favicon.ico"))
	logger("dev")
	bodyParser.json()
	bodyParser.urlencoded({ extended: false })
	cookieParser()
	sassMiddleware({
		src: path.join(__dirname, "public/scss"),
		// file: 'style.scss',
		dest: path.join(__dirname, "public/css"),
		debug: true,
		outputStyle: process.env === "development" ? "expanded" : "compressed",
		prefix: "/css" // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
	})
	express.static(path.join(__dirname, "public"))
	compression({
		filter: (req, res) => {
			return req.headers["x-no-compression"]
				? false
				: compression.filter(req, res)
		}
	})
 */