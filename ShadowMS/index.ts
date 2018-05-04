import * as mongoose from "mongoose"
import * as express from "express"
import * as dotenv from "dotenv"
import * as path from "path"

import iShadow from "./types/basic" 

/**
 * @todo Add CMS routes \w handlers
*/

export default class Shadow {
	
	port: number
	db: mongoose.Connection
	dbSchemas: iShadow.Schema[]
	dbModels: iShadow.Models<any>
	middleware: express.RequestHandler[]
	app: express.Express
	routes: iShadow.Route[]
	APIRoutes: iShadow.APIRoute[]
	CatchHandler: iShadow.CatchHandler
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
		this.data = {}

		this.CatchHandler = CatchHandler

		this.app = express()

		this.app.on("update", this.UpdateData.bind(this))

		dotenv.config() 
		this.CreateServer(Number(process.env["PORT"]), process.env["HOST"] as string)

		this.Init()
	}

	InitMiddleware() {
		this.middleware.forEach(( mdw: express.RequestHandler ) => {
			this.app.use(mdw)
		})
	}

	InitRoutes() {
		this.routes.forEach(( route: iShadow.Route ) => {
			const passedData = this // Object.freeze(Object.assign({}, this))
			this.app.use(route.path, route.handler(passedData))
		})
	}

	InitAPI() {
		this.APIRoutes.forEach((route: iShadow.APIRoute) => {
			const handler = route.handler(this)
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

	InitErrorHandler() {
		this.app.use((err, req, res, next) => {
			// set locals, only providing error in development
			res.locals.message = err.message
			res.locals.error = 
				req.app.get("env") === "development" 
					? err 
					: {}
		
			// render the error page
			res.status(err.status || 500)
			res.render("error")
		})
	}

	CreateServer(port: number, host: string) {
		this.app.listen(port, () => {
			console.info('\x1b[32m%s\x1b[0m', ` Listening at ${host}:${port}`)
		})
	}

	Init() {
		this.app.set("views", path.join(__dirname, "..","views"))
		this.app.set("view engine", "pug")
		
		this.data.origin = `${process.env["HOST"]}${process.env["PORT"] 
			? `:${process.env["PORT"]}`
			: ""
		}`
		this.data.sharedMethods = {
			GetFromDB: this.GetFromDB.bind(this)
		}

		this.InitMiddleware()
		this.InitAPI()
		this.InitModels()
		this.UpdateData()

		this.InitRoutes()
		console.info("\x1b[36m%s\x1b[0m"," Ready for Action 👊")
		
	}

	// DataBase Methods
	async GetFromDB(modelName: string, conditions: iShadow.LooseObject = {}) {
		let out: any[] = []
		await this.dbModels[modelName].find(conditions)
			.then ( d   => out = d )
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

	/*async __AddBackground() {
		let out: any
		await this.dbModels["User"]
			.update(
				{}, 
				{ Background: "../images/PH/osx_like-l.jpeg" },
				{ multi: true, overwrite: false }
			)
			.then(res => out = res)
			.catch(err => out = err)
		return out
	}*/

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