import { Link } from "react-router-dom";
import { Form, useFormikContext } from "formik";
import FormInput from "../FormInput/FormInput.tsx";
import { UserFormFields } from "../../../helpers/interfaces.ts";

interface UserFormProps {
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    forgotPassword?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
}

function UserForm(
    { name, email, phone, forgotPassword, confirmPassword, password }:
        UserFormProps,
) {
    const formik = useFormikContext<UserFormFields>();
    return (
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
                            type="text"
                            disabled={formik.isSubmitting}
                        />
                        {forgotPassword && (
                            <div className="mt-1 ml-2 mb-4 text-sm text-gray-600">
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
                            type="text"
                            disabled={formik.isSubmitting}
                        />
                    </div>
                )}
            {/* Submit */}
            <button
                type="submit"
                className="btn btn-primary w-full"
            >
                Login
            </button>
        </Form>
    );
}

export default UserForm;
