import iShadow from "../ShadowMS/types/basic"
import Route from "../ShadowMS/classes/Route"
import * as express from "express"

const router = express.Router()
const handlerConstruct: iShadow.HandlerConstruct = (Shadow: iShadow.App) => 
  router.get("/", (req, res) => {
    res.clearCookie("UserID")
      .redirect(Shadow.data["origin"])
  })

export default new Route("/logout", handlerConstruct)

 