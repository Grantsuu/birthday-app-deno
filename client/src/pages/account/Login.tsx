import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import UserForm from "../../components/Form/UserForm/UserForm.tsx";
import type { UserFormFields } from "../../helpers/interfaces.ts";

export const LOGIN_FORM_SCHEMA = Yup.object({
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
    date: Yup.string()
        .required("Date is required")
        .matches(
            /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
            "Date must be in YYYY-MM-DD format",
        ),
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
                        <UserForm email forgotPassword password />
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
