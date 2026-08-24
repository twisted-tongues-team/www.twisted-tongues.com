import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { ExportFormat } from "./App.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <ExportFormat />
  </StrictMode>,
);
