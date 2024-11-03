import { Form, Formik } from "formik";
import * as Yup from "yup";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { API_HOST } from "../../helpers/constants.ts";
import FormInput from "../Form/FormInput/FormInput.tsx";
import { Birthday } from "../../../../server/interfaces.ts";

interface AddModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    getBirthdays: () => void;
    id?: number;
}

function AddModal({ show, setShow, getBirthdays, id }: AddModalProps) {
    const addBirthday = async (birthday: Birthday) => {
        const response = await fetch(
            `${API_HOST}/api/birthday/1`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    birthday,
                ),
            },
        );
        return await response.json();
    };

    return (
        <dialog className="modal" open={show}>
            <div className="modal-box">
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>
                <h3 className="text-lg font-bold">Add Birthday</h3>
                <p className="py-4">
                    Please enter the birthday details below.
                </p>
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        date: "2000-01-01",
                    }}
                    validationSchema={Yup.object({
                        firstName: Yup.string()
                            .required("First name is required"),
                        lastName: Yup.string()
                            .required("Last name is required"),
                        date: Yup.string()
                            .required("Date is required")
                            .matches(
                                /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
                                "Date must be in YYYY-MM-DD format",
                            ),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true);
                        addBirthday({
                            name: `${values.firstName} ${values.lastName}`,
                            date: values.date,
                        }).then(() => {
                            setSubmitting(false);
                            setShow(false);
                            getBirthdays();
                        });
                    }}
                >
                    {(formik) => (
                        <Form>
                            {/* First Name */}
                            <div className="grid grid-cols-2 gap-2">
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
                                        setShow(false);
                                    }}
                                >
                                    Cancel
                                </button>
                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="btn bg-blue-400 hover:bg-blue-500 text-neutral-content"
                                >
                                    {formik.isSubmitting
                                        ? (
                                            <span className="loading loading-spinner loading-md" />
                                        )
                                        : "Submit"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <form
                method="dialog"
                className="modal-backdrop bg-neutral bg-opacity-40"
            >
                <button
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    close
                </button>
            </form>
        </dialog>
    );
}

export default AddModal;
