import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Dev } from "./App.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <Dev />
  </StrictMode>,
);
