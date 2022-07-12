import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./provider/data";
import Html from './Html'
import App from "./App";
import "./index.css";
console.log('window.__INITIAL_DATA__:', window.__INITIAL_DATA__)
const FullApp = () => (
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider data={window.__INITIAL_DATA__}>
        <Html ssrData={window.__INITIAL_DATA__}>
          <App />
        </Html>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);

  hydrateRoot(document.documentElement, <FullApp />);