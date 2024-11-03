// @deno-types="@types/react"
import { StrictMode } from "react";
// @deno-types="@types/react-dom/client"
import { createRoot } from "react-dom/client";
import App from "./pages/BirthdayPage/BirthdayPage.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
