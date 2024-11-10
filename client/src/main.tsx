// @deno-types="@types/react"
import { StrictMode } from "react";
// @deno-types="@types/react-dom/client"
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AccountLayout from "./pages/account/AccountLayout.tsx";
import Birthday from "./pages/BirthdayPage/BirthdayPage.tsx";
import Login from "./pages/account/Login.tsx";
import Register from "./pages/account/Register.tsx";
import ResetPassword from "./pages/account/ResetPassword.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world!</div>,
    },
    {
        element: <AccountLayout />,
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
        element: <Birthday />,
    },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
