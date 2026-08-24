import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { About } from "./App.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <About />
  </StrictMode>,
);
