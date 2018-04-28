import * as express from "express"
import APIRoute from "../../ShadowMS/classes/APIRoute"
import iShadow from "../../ShadowMS/types/basic"
const path = "/api/add/post"
const method = "POST"
const handler: iShadow.APIHandlerConstruct = (models: iShadow.Models) => (
  req, 
  res
  ) => {
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
  const rk = JSON.stringify(reqKeys)
  const pk = JSON.stringify(properKeys)
	if(!( rk === pk) ) {
		// Error / Rejection Handler
		res.statusCode = 400
		res.send({"Response": "You got rejected!"})
	} else {
		const newPost = new models.Post(req.body).save()
		res.send({"Response": "Saved to DB :)"})
	}
	console.dir(req.body, {colors: true})
}
const apiRoute = new APIRoute(method, path, handler)
export default apiRoute
