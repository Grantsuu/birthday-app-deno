import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "formik";
import FormInput from "../FormInput/FormInput.tsx";
import { UserFormFields } from "../../../helpers/interfaces.ts";

interface UserFormProps {
    formLabel: string;
    submitLabel: string;
    onSubmit?: void;
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    forgotPassword?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
}

function UserForm(
    {
        formLabel,
        submitLabel,
        name,
        email,
        phone,
        forgotPassword,
        confirmPassword,
        password,
    }: UserFormProps,
) {
    const USER_FORM_SCHEMA = Yup.object({
        firstName: name
            ? Yup.string()
                .required("First name is required")
                .matches(
                    /^[a-zA-Z@]+$/,
                    "First name may only contain letters",
                )
            : Yup.string(),
        lastName: name
            ? Yup.string()
                .required("Last name is required")
                .matches(
                    /^[a-zA-Z@]+$/,
                    "Last name may only contain letters",
                )
            : Yup.string(),
        email: email
            ? Yup.string()
                .required("Email is required")
            : Yup.string(),
        phone: phone
            ? Yup.string()
                .required("Phone is required")
            : Yup.string(),
        password: password
            ? Yup.string()
                .required("Password is required")
            : Yup.string(),
        confirmPassword: confirmPassword
            ? Yup.string()
                .required("Please confirm your password")
            : Yup.string(),
    });

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
            validationSchema={USER_FORM_SCHEMA}
        >
            {(formik) => (
                <>
                    <div className="card-title justify-center">
                        {formLabel}
                    </div>
                    <Form>
                        {/* Name */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {/* First Name */}
                            {name && (
                                <>
                                    <FormInput
                                        name="firstName"
                                        placeholder="First Name"
                                        type="text"
                                        disabled={formik.isSubmitting}
                                    />
                                    {/* Last Name */}
                                    <FormInput
                                        name="lastName"
                                        placeholder="Last Name"
                                        type="text"
                                        disabled={formik.isSubmitting}
                                    />
                                </>
                            )}
                        </div>
                        {/* Email */}
                        {email && (
                            <div className="mb-4">
                                <FormInput
                                    name="email"
                                    placeholder="Email"
                                    type="text"
                                    disabled={formik.isSubmitting}
                                />
                            </div>
                        )}
                        {/* Phone Number */}
                        {phone && (
                            <div className="mb-4">
                                <FormInput
                                    name="phone"
                                    placeholder="Phone Number"
                                    type="text"
                                    disabled={formik.isSubmitting}
                                />
                            </div>
                        )}
                        {/* Password */}
                        {password &&
                            (
                                <div className="mb-4">
                                    <FormInput
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        disabled={formik.isSubmitting}
                                    />
                                    {/* Forgot Password */}
                                    {forgotPassword && (
                                        <div className="flex justify-end mt-1 mr-1 mb-4 text-sm text-gray-600">
                                            <Link to={"/reset-password"}>
                                                Forgot password?
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        {/* Confirm Password */}
                        {confirmPassword &&
                            (
                                <div className="mb-4">
                                    <FormInput
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        type="password"
                                        disabled={formik.isSubmitting}
                                    />
                                </div>
                            )}
                        {/* Submit */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            {formik.isSubmitting
                                ? (
                                    <span className="loading loading-spinner loading-md" />
                                )
                                : submitLabel}
                        </button>
                    </Form>
                </>
            )}
        </Formik>
    );
}

export default UserForm;
