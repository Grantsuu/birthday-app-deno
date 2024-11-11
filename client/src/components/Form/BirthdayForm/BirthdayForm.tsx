import { Form, Formik } from "formik";
import { BIRTHDAY_FORM_SCHEMA } from "../../../helpers/constants.ts";
import FormInput from "../FormInput/FormInput.tsx";
import { Birthday } from "../../../../../server/interfaces.ts";
import { BirthdayFormFields } from "../../../helpers/interfaces.ts";

interface BirthdayFormProps {
    setShow: (show: boolean) => void;
    handleSubmit: (birthday: Birthday) => Promise<Response>;
    getBirthdays: () => void;
    initial?: {};
}

function BirthdayForm(
    { setShow, handleSubmit, getBirthdays, initial }: BirthdayFormProps,
) {
    return (
        <Formik
            initialValues={initial ? initial : {
                firstName: "",
                lastName: "",
                date: "2000-1-1",
            }}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                setSubmitting(true);
                handleSubmit({
                    firstName: `${encodeURIComponent(values.firstName)}`,
                    lastName: `${encodeURIComponent(values.lastName)}`,
                    date: encodeURIComponent(values.date),
                }).then(() => {
                    setSubmitting(false);
                    resetForm();
                    setShow(false);
                    getBirthdays();
                });
            }}
            validationSchema={BIRTHDAY_FORM_SCHEMA}
        >
            {(formik) => (
                <Form>
                    {/* Name */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {/* First Name */}
                        <FormInput
                            name="firstName"
                            placeholder="First Name"
                            type="text"
                            className="input input-bordered"
                            disabled={formik.isSubmitting}
                        />
                        {/* Last Name */}
                        <FormInput
                            name="lastName"
                            placeholder="Last Name"
                            type="text"
                            className="input input-bordered"
                            disabled={formik.isSubmitting}
                        />
                    </div>
                    {/* Date */}
                    <div className="mb-4">
                        <FormInput
                            name="date"
                            placeholder="mm/dd/yyyy"
                            type="date"
                            className="input input-bordered"
                            disabled={formik.isSubmitting}
                        />
                    </div>
                    {/* Buttons */}
                    <div className="flex justify-end space-x-2">
                        {/* Cancel */}
                        <button
                            type="button"
                            className="btn"
                            onClick={() => {
                                formik.resetForm();
                                setShow(false);
                            }}
                        >
                            Cancel
                        </button>
                        {/* Submit */}
                        <button
                            type="submit"
                            className={initial
                                ? "btn btn-success text-neutral-content"
                                : "btn bg-blue-400 hover:bg-blue-500 text-neutral-content"}
                        >
                            {formik.isSubmitting
                                ? (
                                    <span className="loading loading-spinner loading-md" />
                                )
                                : initial
                                ? "Save"
                                : "Submit"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default BirthdayForm;
