import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

export const RESET_PASSWORD_FORM_SCHEMA = Yup.object({
    password: Yup.string()
        .required("Password is required"),
    confirmPassword: Yup.string()
        .required("Please confirm your password"),
});

function ResetPassword() {
    return (
        <>
            <div className="card-title justify-center">
                Reset Password
            </div>
            <Link to={"/login"}>Return to Login</Link>
        </>
    );
}

export default ResetPassword;
