import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

import { SubmitStatusProvider } from "./context/submitStatus.context";
import { AccessStatusProvider } from "./context/accessStatus.context";
import { ActionStatusProvider } from "./context/actionStatus.context.jsx";
import { ThemeProvider } from "./context/theme.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <ThemeProvider>
      <ActionStatusProvider>
        <AccessStatusProvider>
          <SubmitStatusProvider>
            <App />
          </SubmitStatusProvider>
        </AccessStatusProvider>
      </ActionStatusProvider>
    </ThemeProvider>
  </StrictMode>,
);
