import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Releases } from "./App.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <Releases />
  </StrictMode>,
);
