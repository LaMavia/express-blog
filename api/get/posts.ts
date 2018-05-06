import APIRoute from "../../ShadowMS/classes/APIRoute"
import iShadow from "../../ShadowMS/types/basic"

const path = "/api/posts"
const method = "GET"
const handler = (Shadow: iShadow.App) => (req, res) => {
	Shadow.dbModels.Post.find()
		.then(data => {
			if (data.length === 0) res.sendStatus(404)
			res.statusCode = 200
			res.type("application/json")
			res.send(JSON.stringify(data))
		})
		.catch(Shadow.CatchHandler)
}
const apiRoute = new APIRoute(method, path, handler)
export default apiRoute
