import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ManualFr } from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ManualFr />
  </StrictMode>,
);
