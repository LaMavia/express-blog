import iShadow from "../ShadowMS/types/basic"
import Route from "../ShadowMS/classes/Route"
import Models from "../ShadowMS/types/models"
import formatPages from "../ShadowMS/functions/formatPages"
import userRenderProps from "../ShadowMS/functions/userRenderProps"
import * as express from "express"
// import { renderToString } from "react-dom/server"


const router = express.Router()

const handlerConstruct = (Shadow: iShadow.App) => 
  router.get("/", (req, res) => {
    const id = req.cookies["UserID"]
    const isAdmin = 
      Shadow.data["User"].some((user: Models.User) => 
        String(user._id) === id
      )
    if(isAdmin) {
      res.render("panel/editor", {
        title: "Express -> Editor",
				home: Shadow.data.origin,
        user: userRenderProps(req.cookies["UserID"], Shadow.data["User"]),
        pages: formatPages(Shadow.data, "NavPage"),
      })
    }
    else {
      res.redirect(Shadow.data.origin)
    }
  })

export default new Route("/panel/editor", handlerConstruct)

