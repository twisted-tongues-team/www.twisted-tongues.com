import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Main } from "./App.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <Main />
  </StrictMode>,
);
