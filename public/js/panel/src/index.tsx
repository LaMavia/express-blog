import * as ReactDOM from "react-dom"
import * as React from "react"
import App from "./app"
import Models from "../../../../ShadowMS/types/models"

window.addEventListener("DOMContentLoaded", async e => {
  ReactDOM.render(
    <App/>
  ,document.getElementById("root"))
})
