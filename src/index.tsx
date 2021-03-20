import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { App } from "./App";
import { Layout, Loader } from "./components";
import { AirtableProvider } from "./utilities";

ReactDOM.render(
  <React.StrictMode>
    <AirtableProvider>
      <Layout>
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      </Layout>
    </AirtableProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
