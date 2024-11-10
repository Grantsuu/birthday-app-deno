import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

export const REGISTER_FORM_SCHEMA = Yup.object({
    firstName: Yup.string()
        .required("First name is required")
        .matches(
            /^[a-zA-Z@]+$/,
            "First name may only contain letters",
        ),
    lastName: Yup.string()
        .required("Last name is required")
        .matches(
            /^[a-zA-Z@]+$/,
            "Last name may only contain letters",
        ),
    email: Yup.string()
        .required("Email is required"),
    phone: Yup.string()
        .required("Phone is required"),
    password: Yup.string()
        .required("Password is required"),
    confirmPassword: Yup.string()
        .required("Please confirm your password"),
});

function Register() {
    return (
        <>
            <div className="card-title justify-center">
                Register Account
            </div>
            <Link to={"/login"}>Return to Login</Link>
        </>
    );
}

export default Register;
