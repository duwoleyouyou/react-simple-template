import ReactDom from "react-dom";
import React from "react";
import "antd/dist/antd.css";
import "./index.less";
import { renderRoutes } from "react-router-config";
import routes from "@/config/routes";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "@/store/index";
import { Provider } from "react-redux";

ReactDom.render(
  <Router>
    <Provider store={store}>{renderRoutes(routes)}</Provider>
  </Router>,
  document.getElementById("app")
);
