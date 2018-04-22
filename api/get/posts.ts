import * as express from "express"
import APIRoute from "../../ShadowMS/classes/APIRoute"
import iShadow from "../../ShadowMS/types/basic"
// const Router = express.Router()
const path = "/api/posts"
const method = "GET"
const handler = (models: iShadow.Models) => (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	models.Post.find()
		.then(data => {
			if (data.length === 0) res.sendStatus(404)
			res.statusCode = 200
			res.type("application/json")
			res.send(JSON.stringify(data))
		})
		.catch(console.error)
}
const apiRoute = new APIRoute(method, path, handler)
export default apiRoute
