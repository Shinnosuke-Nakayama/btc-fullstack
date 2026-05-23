import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UIProvider } from "@yamada-ui/react";
import "./index.css";
import App from "./components/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UIProvider>
      <App />
    </UIProvider>
  </StrictMode>,
);
