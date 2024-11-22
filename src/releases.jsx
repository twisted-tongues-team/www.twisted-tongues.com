import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Releases } from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Releases />
  </StrictMode>,
);