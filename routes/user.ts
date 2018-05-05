import iShadow from "../ShadowMS/types/basic"
import Models from "../ShadowMS/types/models"
import Route from "../ShadowMS/classes/Route"
import formatPages from "../ShadowMS/functions/formatPages"
import userRenderProps from "../ShadowMS/functions/userRenderProps"
import formatDate from "../ShadowMS/functions/formatDate"

import * as express from 'express'
const router = express.Router()

const handlerConstruct: iShadow.HandlerConstruct = Shadow => 
  router.get("/:id", (req, res) => {
    const displayedUser = Shadow.data["User"].find((dbUser: Models.User) =>  
      String(dbUser._id) === String(req.params["id"])
    )

    if(displayedUser) {
      res.render("user", {
        home: Shadow.data["origin"],
        pages: formatPages(Shadow.data, "NavPage"),
        posts: Shadow.data["Post"].filter(pst => pst._doc.Author === displayedUser.Name),
        title: "Express",
        displayedUser,
        user: userRenderProps(req.cookies["UserID"], Shadow.data["User"])
      })
    }
  })

export default new Route("/users/", handlerConstruct)