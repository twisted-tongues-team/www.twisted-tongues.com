import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Manual } from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Manual />
  </StrictMode>,
);
