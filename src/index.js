import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/redux-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import SamuraiJsApp from "./App";

// let rerenderEntireTree = (state) => {
ReactDOM.render(
    // <BrowserRouter>
    //     <Provider store={store}>
    //         <App/>
    //     </Provider>
    // </BrowserRouter>,
    <SamuraiJsApp/>,
    document.getElementById("root")
);
// };

// rerenderEntireTree();
// store.subscribe(() => {
//     let state = store.getState();
//     rerenderEntireTree(state);
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
