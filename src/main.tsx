import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { VenueProvider } from "./context/VenueContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VenueProvider>
      <App />
    </VenueProvider>
  </StrictMode>
);
