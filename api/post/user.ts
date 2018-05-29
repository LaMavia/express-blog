import APIRoute from "../../ShadowMS/classes/APIRoute"
import iShadow from "../../ShadowMS/types/basic"
import Models from "../../ShadowMS/types/models"
import hash from "../../ShadowMS/functions/hash"
import * as fs from 'fs-extra'
import * as _path from 'path'

interface IsTakenRes {
  Email: boolean
  Login: boolean
}
const IsTaken = (user: Models.IUser, Shadow: iShadow.App): IsTakenRes => {
  const dbUsers: Models.User[] = Shadow.data["User"]
  const isEmailTaken = 
    dbUsers.some( 
      (dbUser: Models.User) => dbUser.Email === user.Email
    )
  const isLoginTaken = 
    dbUsers.some(
      (dbUser: Models.User) => dbUser.Login === user.Login
    )

  return {
    Email: isEmailTaken,
    Login: isLoginTaken
  } 
}
// @ts-ignore
const fillUser = async (user: Models.IUser): Models.IUser => {
  let img: string
  let temp: Models.IUser

  const fill = (img: string = ""): Models.IUser => ({
    ...user,
    Desc: user.Desc || "I'm just a placeholder awaiting my master.",
    Img: user.Img || img,
    Type: user.Type || "User",
    BirthDate: user.BirthDate || "2018 05 26"
  }) 

  if(!user.Img) {
    await fs.readFile(_path.resolve(__dirname, "../../DEV/PH_Img.txt"))
      .then(res => img = res.toString()) 
      .then(res => temp = fill(res))
      .catch(err => {
        new Error(err)
      })
  } 
  else {
    temp = fill()
  }
  // @ts-ignore
  return temp
}
  
const path = "/api/add/user"
const method = "POST"
const handler: iShadow.APIHandlerConstruct = (Shadow: iShadow.App) => 
  async (req, res, next) => {
    
    if(!(req.body) || Object.keys(req.body).length === 0) {
      res.statusCode = 406 // Not Acceptable
      return res.send({ Response: "Empty body" })
    }
    const user: Models.IUser = await fillUser(req.body)
    const taken = IsTaken(user, Shadow)
    if(taken.Email || taken.Login) {
      res.statusCode = 409 // Conflict
      return res.send(taken)
    } else {
      hash([user.Password], 10)
        .then( hashed => {
          user.Password = hashed[0]
          Shadow.dbModels["User"].create(user)
            .then(() => {
              Shadow.app.emit("update", "User")
              res.statusCode = 201
              res.send({ Response: "Saved to DB" })
            })
            .catch(err => {
              Shadow.CatchHandler(err)
              next(err)
            })
        })
    }
  }

export default new APIRoute(method, path, handler)
