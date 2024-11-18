import { Form, Formik } from "formik";
import { BIRTHDAY_FORM_SCHEMA } from "../../../helpers/constants.ts";
import FormTextInput from "../FormTextInput/FormTextInput.tsx";
import { Birthday } from "../../../../../server/interfaces.ts";
import { BirthdayFormFields } from "../../../helpers/interfaces.ts";
import { useBirthdayContext } from "../../../contexts/BirthdayContext.tsx";

interface BirthdayFormProps {
    handleSubmit: (birthday: Birthday) => Promise<Response>;
    getBirthdays: () => void;
    initial?: BirthdayFormFields
}

function BirthdayForm(
    { handleSubmit, getBirthdays, initial }: BirthdayFormProps,
) {
    const { setShowAddModal, setShowEditModal, setShowDeleteModal, birthdayFormikRef } = useBirthdayContext();

    const closeAllModals = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
    }

    return (
        <Formik
            initialValues={initial ? initial : {
                firstName: "",
                lastName: "",
                date: "2000-01-01",
            } as BirthdayFormFields}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                setSubmitting(true);
                handleSubmit({
                    firstName: `${encodeURIComponent(values.firstName)}`,
                    lastName: `${encodeURIComponent(values.lastName)}`,
                    date: encodeURIComponent(values.date),
                }).then(() => {
                    setSubmitting(false);
                    resetForm();
                    closeAllModals();
                    getBirthdays();
                });
            }}
            validationSchema={BIRTHDAY_FORM_SCHEMA}
            innerRef={birthdayFormikRef}
        >
            {(formik) => (
                <Form>
                    {/* Name */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {/* First Name */}
                        <FormTextInput
                            name="firstName"
                            placeholder="First Name"
                            type="text"
                            disabled={formik.isSubmitting}
                        />
                        {/* Last Name */}
                        <FormTextInput
                            name="lastName"
                            placeholder="Last Name"
                            type="text"
                            disabled={formik.isSubmitting}
                        />
                    </div>
                    {/* Date */}
                        <FormTextInput
                            name="date"
                            className="mb-4"
                            placeholder="mm/dd/yyyy"
                            type="date"
                            disabled={formik.isSubmitting}
                        />
                    {/* Buttons */}
                    <div className="flex justify-end space-x-2">
                        {/* Cancel */}
                        <button
                            type="button"
                            className="btn"
                            onClick={() => {
                                formik.resetForm();
                                closeAllModals();
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
