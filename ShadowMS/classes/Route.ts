import Shadow from "../types/basic"
import * as express from "express"
import iShadow from "../types/basic";

export default class Route implements Shadow.Route{
  path: string
  handler: iShadow.HandlerConstruct
  constructor(path: string, handler: iShadow.HandlerConstruct) {
    this.path = path
    this.handler = handler
  }
}