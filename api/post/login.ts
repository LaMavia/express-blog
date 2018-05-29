import APIRoute from "../../ShadowMS/classes/APIRoute"
import iShadow from "../../ShadowMS/types/basic"
import Models from "../../ShadowMS/types/models"

import * as bcrypt from "bcrypt"

const path = "/api/login"
const method = "POST"

const userExists = (user: {Login:string, Password: string}, users: Models.User[]): boolean | Models.User => {
  let foundUser: Models.User | null = null
  users.some(dbUser => {
    if(user.Login === dbUser.Login){
      if(bcrypt.compareSync(user.Password, dbUser.Password)) {
        foundUser = dbUser
        return true
      }
    }
    return false
  })
  return foundUser ? foundUser : false
}

const handlerConstruct: iShadow.APIHandlerConstruct = (Shadow: iShadow.App) => 
  (req, res) => {
    console.time("check")
    const data = req.body
    const user = userExists(data, Shadow.data.User) as Models.User
    if(user) {
      res.cookie(
        "UserID", 
        String(user._id),
        { maxAge: 10800000 }
      ).redirect(Shadow.data["origin"])
    } else {
      res.sendStatus(400)
    }
    console.timeEnd("check")
  }

export default new APIRoute(method, path, handlerConstruct)