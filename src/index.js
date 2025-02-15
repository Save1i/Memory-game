import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LevelProvider } from "../src/components/LevelContext"; // Импортируем провайдер

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LevelProvider>
    <App />
  </LevelProvider>
);
