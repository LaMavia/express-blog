import * as mongoose from "mongoose";
import Schema from "../../ShadowMS/classes/Schema"

const USER_SCHEMA = new mongoose.Schema({
  Login: String,
  Password: String, // hashed using bcrypt
  Email: String,

  Name: String, // Both firstname and lastname
  Desc: String,
  BirthDate: String, // YYYY MM DD
  Img: String, // Use prefix data:image/jpeg;base64, on Front-End
  Type: String // User / Admin
})

export default new Schema("User", USER_SCHEMA, "users")


// { data: Buffer, contentType: String }