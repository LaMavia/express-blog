import APIRoute from "../../ShadowMS/classes/APIRoute"
import iShadow from "../../ShadowMS/types/basic"
import Models from "../../ShadowMS/types/models"
import * as express from "express"

const canAccess = (user: Models.User, users: Models.User[]) =>
  users.some(dbUser => String(dbUser._id) === String(user._id) || user.Type === "Admin")

const path = "/api/user"
const method = "GET"
const handler = (Shadow: iShadow.App) => (req: express.Request, res: express.Response) => {
  const id = req.query["id"] || req.cookies["UserID"]
  const reqUser: Models.User = Shadow.data["User"].find((user: Models.User) => String(user._id) === id) || null
	Shadow.dbModels["User"].findOne({_id: id})
		.then((data: Models.User) => {
      if(!data) return res.sendStatus(404)
      if(!(canAccess(reqUser, Shadow.data["User"]))) return res.sendStatus(401)
      else {
        res.statusCode = 200
        res.contentType("application/json")
        // @ts-ignore
        res.send(JSON.stringify(data._doc))
      }
		})
		.catch(Shadow.CatchHandler)
}
const apiRoute = new APIRoute(method, path, handler)
export default apiRoute
