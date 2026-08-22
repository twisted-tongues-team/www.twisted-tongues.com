import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Dev } from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Dev />
  </StrictMode>,
);
