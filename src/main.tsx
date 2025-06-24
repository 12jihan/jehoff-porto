import "./styles/main.scss";
import routes from "./routes.tsx";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnalyticsProvider } from "./context/AnalyticsContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AnalyticsProvider>
        <RouterProvider router={routes} />
      </AnalyticsProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
