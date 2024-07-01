import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { AlertProvider } from "./components/AlertProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  // Provider for Redux state management
  <Provider store={store}>
    {/* Provider for custom Alert */}
    <AlertProvider>
      {/* Router which setup routes and navigation  in app */}
      <Router>
        <App />
      </Router>
    </AlertProvider>
  </Provider>
  // </React.StrictMode>
);
