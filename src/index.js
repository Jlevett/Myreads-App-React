//External Dependencies
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom";

//Our Dependencies
import App from "./App"
import "./index.css"

ReactDOM.render(
	<BrowserRouter basename="/Myreads-App-React"><App/></BrowserRouter>,
	document.getElementById("root")
)
