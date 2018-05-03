import APIRoute from "../../ShadowMS/classes/APIRoute"
import iShadow from "../../ShadowMS/types/basic"
import Models from "../../ShadowMS/types/models"

import * as bcrypt from "bcrypt"

const path = "/api/login"
const method = "POST"

const userExists = (user: {Login:string, Password: string}, users: Models.User[]): boolean => 
  users.some(dbUser => 
    user.Login === dbUser.Login
      ? bcrypt.compareSync(user.Password, dbUser.Password)
      : false
  )
  /*users.some(dbUser => 
    user.Login === dbUser.Login
      ? bcrypt.compareSync(user.Password, dbUser.Password)
      : false
  )*/
/**
{
  for(const dbUser of users) {
    if(user.Login === dbUser.Login)
      return bcrypt.compareSync(user.Password, dbUser.Password)
  }
  return false
}

*/

const handlerConstruct: iShadow.APIHandlerConstruct = (Shadow: iShadow.App) => 
  (req, res) => {
    console.time("check")
    const data = req.body
    if(userExists(data, Shadow.data.User)) {
      res.sendStatus(200)
    } else {
      res.sendStatus(400)
    }
    console.timeEnd("check")
  }

export default new APIRoute(method, path, handlerConstruct)