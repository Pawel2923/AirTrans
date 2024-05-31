import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AuthProvider from "./store/AuthProvider.tsx";
import ToastModalProvider from "./store/ToastModalProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastModalProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ToastModalProvider>
  </React.StrictMode>
);
