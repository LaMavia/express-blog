import APIRoute from "../../ShadowMS/classes/APIRoute"
import iShadow from "../../ShadowMS/types/basic"

const path = "/api/add/post"
const method = "POST"
const handler: iShadow.APIHandlerConstruct = (Shadow: iShadow.App) => (
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
	if(rk !== pk) {
		res.statusCode = 400
		res.send({Response: "Wrong body format"})
	} else {
    Shadow.dbModels.Post.create(req.body)
      .then(() => {
				Shadow.app.emit("update", "Post")
				res.statusCode = 201
				res.send({Response: "Saved to DB :)"})
			})
      .catch(Shadow.CatchHandler)
	}
	// console.dir(req.body, {colors: true})
}

export default new APIRoute(method, path, handler)
