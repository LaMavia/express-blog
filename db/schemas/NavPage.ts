import * as mongoose from "mongoose"
import Schema from "../../ShadowMS/classes/Schema"
/**
 * @type {mongoose.Schema}
 */
const NAVPAGE_SCHEMA = new mongoose.Schema({
  Name: String,
  Href: String
})

export default new Schema("NavPage", NAVPAGE_SCHEMA, "nav-pages")
