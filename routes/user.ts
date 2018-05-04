import iShadow from "../ShadowMS/types/basic"
import Models from "../ShadowMS/types/models"
import Route from "../ShadowMS/classes/Route"
import formatPages from "../ShadowMS/functions/formatPages"
// import userRenderProps from "../ShadowMS/functions/userRenderProps"

import * as express from 'express'
const router = express.Router()

const handlerConstruct: iShadow.HandlerConstruct = Shadow => 
  router.get("/:id", (req, res) => {
    const user = Shadow.data["User"].find((dbUser: Models.User) =>  
      String(dbUser._id) === String(req.params["id"])
    )
    if(user) {
      res.render("user", {
        home: Shadow.data["origin"],
        pages: formatPages(Shadow.data, "NavPage"),
        posts: Shadow.data["Post"].filter(pst => pst._doc.Author === user.Name),
        title: "Express",
        user
      })
    }
  })

export default new Route("/users/", handlerConstruct)