import * as mongoose from "mongoose"
import * as express from "express"
declare namespace iShadow {
  interface LooseObject {
    [key: string]: any
  }
  interface Schema {
    name: string
    schema: mongoose.Schema
    collection: string
  }
  
  interface Models {
    [name: string]: mongoose.Model<any>
  }

  type HandlerConstruct = (data: LooseObject) => express.Router
  interface Route {
    path: string
    handler: HandlerConstruct // (req: any, res: any, next: any) => Promise<void>
  }
  
  type APIHandlerConstruct = (models: Models) => express.RequestHandler
  type Method = "GET" | "POST" | "PUT" | "DELETE"
  interface APIRoute {
    method: Method
    path: string | RegExp
    handler: APIHandlerConstruct
  }
  
  interface NavPage {
    Name: string
    Href: string
  }
  
  interface Host {
    address: string
    port: number
    family: string
  }

  type CatchHandler = (( err: any ) => void | any)

}

export default iShadow