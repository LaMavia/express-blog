import * as express from "express"
const router = express.Router()

import iShadow from "../ShadowMS/types/basic"
import Route from "../ShadowMS/classes/Route"

const path = "/register"
const handlerConstruct = (Shadow: iShadow.App) => 
  router.get("/", (req, res) => {
    const pages = Shadow.data["NavPage"] 
    if(req.cookies["UserID"]) 
      return res.redirect(Shadow.data["origin"])
    
    res.render("register", {
			title: "Express",
			pages,
			home: Shadow.data.origin
		})
  })

export default new Route(path, handlerConstruct)