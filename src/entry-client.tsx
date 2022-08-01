import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./provider/data";
import Html from './Html'
import App from "./App";
import "./index.css";

const FullApp = () => (
  <React.StrictMode>
    <BrowserRouter>
     <DataProvider data={window.__INITIAL_DATA__}>
        <Html>
          <App />
        </Html>
      </DataProvider>
    </BrowserRouter>
 </React.StrictMode>
);

  hydrateRoot(document.documentElement, <FullApp />);