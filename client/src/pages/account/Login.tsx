import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import UserForm from "../../components/Form/UserForm/UserForm.tsx";
import type { UserFormFields } from "../../helpers/interfaces.ts";

export const LOGIN_FORM_SCHEMA = Yup.object({
    email: Yup.string()
        .required("Email is required"),
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
                console.log("pressed");
                console.log(values);
            }}
            // validationSchema={LOGIN_FORM_SCHEMA}
        >
            {(formik) => (
                <>
                    <div className="card-title justify-center">
                        Login
                    </div>
                    <UserForm
                        submitLabel="Login"
                        email
                        forgotPassword
                        password
                    />
                    <Link to={"/register"}>
                        <div className="ml-2">
                            Register a new account
                        </div>
                    </Link>
                </>
            )}
        </Formik>
    );
}

export default Login;
