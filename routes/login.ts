import * as express from "express"
const router = express.Router()

import iShadow from "../ShadowMS/types/basic"
import Route from "../ShadowMS/classes/Route"

const path = "/login"
const handlerConstruct = (Shadow: iShadow.App) => 
  router.get("/", (req, res) => {
    const data = Shadow.data
    const pages = Shadow.data["NavPage"] 
    if(req.cookies["UserID"]) 
      return res.redirect(Shadow.data["origin"])
    
    res.render("login", {
			title: "Express",
			pages,
			home: data.origin
		})
  })

export default new Route(path, handlerConstruct)