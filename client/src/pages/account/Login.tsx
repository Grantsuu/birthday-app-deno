import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import UserForm from "../../components/Form/UserForm/UserForm.tsx";
import type { UserFormFields } from "../../helpers/interfaces.ts";

export const LOGIN_FORM_SCHEMA = Yup.object({
    // firstName: Yup.string()
    //     .required("First name is required")
    //     .matches(
    //         /^[a-zA-Z@]+$/,
    //         "First name may only contain letters",
    //     ),
    // lastName: Yup.string()
    //     .required("Last name is required")
    //     .matches(
    //         /^[a-zA-Z@]+$/,
    //         "Last name may only contain letters",
    //     ),
    email: Yup.string()
        .required("Email is required"),
    // phone: Yup.string()
    //     .required("Phone is required"),
    password: Yup.string()
        .required("Password is required"),
});

function Login() {
    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                password: "",
            } as UserFormFields}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                console.log("pressed")
                console.log(values);
            }}
            validationSchema={LOGIN_FORM_SCHEMA}
        >
            {(formik) => (
                <div className="card-compact rounded-box  w-full shadow-xl bg-base-200">
                    <div className="card-body">
                        <div className="card-title justify-center">
                            Login
                        </div>
                        <UserForm submitLabel="Login" email forgotPassword password />
                        <Link to={"/register"}>
                            <div className="ml-2">
                                Create an account
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default Login;
