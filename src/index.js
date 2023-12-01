import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// font-awesome icons
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

// bootstrap link
import "../node_modules/bootstrap/dist/css/bootstrap.css";
// import provider
import { Provider } from "react-redux";
// import store
import { store } from "./redux/store";
// import "../node_modules/bootstrap/dist/css/bootstrap.bundle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <Provider store={store}>
     <BrowserRouter>
        <App />
      </BrowserRouter>
   </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
