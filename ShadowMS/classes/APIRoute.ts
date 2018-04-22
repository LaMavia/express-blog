import Shadow from "../types/basic"
import * as express from "express"
import iShadow from "../types/basic";

export default class APIRoute implements Shadow.APIRoute{
  method: iShadow.Method
  path: string
  handler: iShadow.APIHandlerConstruct
  constructor(method: iShadow.Method, path: string, handler: iShadow.APIHandlerConstruct) {
    this.method = method
    this.path = path
    this.handler = handler
  }
}