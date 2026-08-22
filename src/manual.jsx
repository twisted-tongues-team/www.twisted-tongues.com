import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Manual } from "./App.jsx";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <Manual />
  </StrictMode>,
);
