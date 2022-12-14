import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

const engine = new Styletron();

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyletronProvider value={engine} debug={debug} debugAfterHydration>
    <BaseProvider theme={LightTheme}>
      <Centered>
        <App />
      </Centered>
    </BaseProvider>
  </StyletronProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
