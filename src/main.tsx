import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Import the UIkit JavaScript and icon library
import "uikit/dist/js/uikit.min.js";

// Import the Sass
import "./styles/App.scss";
import { store } from "./redux/store";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
