import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { ManualFr } from "./App.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <ManualFr />
  </StrictMode>,
);
