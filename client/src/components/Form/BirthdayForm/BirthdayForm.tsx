import { Form, useFormikContext } from "formik";
import FormInput from "../FormInput/FormInput.tsx";
import { Birthday } from "../../../../../server/interfaces.ts";

interface BirthdayFormProps {
    editMode?: boolean;
}

function BirthdayForm({editMode}: BirthdayFormProps) {
    const formik = useFormikContext<Birthday>();
    return (
        <Form>
            {/* Name */}
            <div className="grid grid-cols-2 gap-2">
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
            <FormInput
                name="date"
                placeholder="mm/dd/yyyy"
                type="date"
                className="input input-bordered"
                disabled={formik.isSubmitting}
            />
            {/* Buttons */}
            <div className="flex justify-end space-x-2">
                {/* Cancel */}
                <button
                    className="btn"
                    onClick={() => {
                        formik.resetForm();
                        // setShow(false);
                    }}
                >
                    Cancel
                </button>
                {/* Submit */}
                <button
                    type="submit"
                    className={editMode ? "btn btn-success text-neutral-content" : "btn bg-blue-400 hover:bg-blue-500 text-neutral-content"}
                >
                    {formik.isSubmitting
                        ? (
                            <span className="loading loading-spinner loading-md" />
                        )
                        : editMode ? "Edit" : "Submit"}
                </button>
            </div>
        </Form>
    );
}

export default BirthdayForm;
