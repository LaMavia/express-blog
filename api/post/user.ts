import APIRoute from "../../ShadowMS/classes/APIRoute"
import iShadow from "../../ShadowMS/types/basic"
import Models from "../../ShadowMS/types/models"
import hash from "../../ShadowMS/functions/hash"

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
  
const path = "/api/add/user"
const method = "POST"
const handler: iShadow.APIHandlerConstruct = (Shadow: iShadow.App) => 
  async (req, res, next) => {
    const user: Models.IUser = req.body
    if(!user || Object.keys(user).length === 0) {
      res.statusCode = 406 // Not Acceptable
      return res.send({ Response: "Empty body" })
    }
    
    const taken = IsTaken(user, Shadow)
    if(taken.Email || taken.Login) {
      res.statusCode = 409 // Conflict
      return res.send(taken)
    } else {
      hash([user.Password/*, user.Login*/], 10)
        .then( hashed => {
          user.Password = hashed[0]
          // user.Login = hashed[1]
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

/**
 * await bcrypt.genSalt(10)
        .then(salt => {
          bcrypt.hash(user.Password, salt)
            .then(hashedPassword => {
              user.Password = hashedPassword
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
        })
        .catch(err => {
          Shadow.CatchHandler(err)
          next(err)
        })
 */
