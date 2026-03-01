import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppRouter from "./app/router";
import { store } from "./app/store";
import "./shared/styles/global.css";

//Create a React root container get tag HTML with id="root" in index.html
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Store of redux */}
    <Provider store={store}>
      {/* This is component of react-router-dom.  */}
      <BrowserRouter>
        {/* Code of app */}
        <AppRouter />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
