import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BirthdayProvider } from "./contexts/BirthdayContext.tsx";
import LoginLayout from "./pages/Login/LoginLayout.tsx";
import BirthdayPage from "./pages/Birthday/BirthdayPage.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Login/Register.tsx";
import ResetPassword from "./pages/Login/ResetPassword.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world!</div>,
    },
    {
        element: <LoginLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "reset-password",
                element: <ResetPassword />,
            },
        ],
    },
    {
        path: "birthday",
        element: (
            <BirthdayProvider>
                <BirthdayPage />
            </BirthdayProvider>
        ),
    },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
