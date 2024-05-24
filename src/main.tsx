import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { Layout, Loader } from "./components";
import { PocketBaseProvider } from "./utilities";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PocketBaseProvider>
      <Layout>
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      </Layout>
    </PocketBaseProvider>
  </React.StrictMode>
);
