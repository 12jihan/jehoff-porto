import "./styles/main.scss";
import routes from "./routes.tsx";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
);
