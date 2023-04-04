import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ContextProvider from "./context";
import ViewportProvider from "./viewportContext";
import GlobalStyles from "./GlobalStyles";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ViewportProvider>
      <ContextProvider>
        <GlobalStyles />
        <App />
      </ContextProvider>
    </ViewportProvider>
  </React.StrictMode>
);
