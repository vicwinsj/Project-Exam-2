import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { VenueProvider } from "./contexts/VenueContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <VenueProvider>
        <App />
      </VenueProvider>
    </AuthProvider>
  </StrictMode>
);
