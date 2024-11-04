import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { API_HOST } from "../../../helpers/constants.ts";
import { Birthday } from "../../../../../server/interfaces.ts";
import BirthdayForm from "../../Form/BirthdayForm/BirthdayForm.tsx";
import { BirthdayFormFields } from "../../../helpers/interfaces.ts";

interface EditModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    getBirthdays: () => void;
}

function EditModal({ show, setShow, getBirthdays }: EditModalProps) {
    const [birthday, setBirthday] = useState<Birthday[]>();
    const [loading, setLoading] = useState(true);

    const patchBirthday = async (birthday: Birthday) => {
        const response = await fetch(
            `${API_HOST}/api/birthday/1`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    birthday,
                ),
            },
        );
        return await response.json();
    };

    const getBirthday = async (id: number) => {
        const response = await fetch(
            `${API_HOST}/api/birthday?id=${id}`,
            {
                method: "GET",
            },
        );
        return await response.json();
    };

    const handleGetBirthdays = () => {
        setLoading(true);
        getBirthday(1)
            .then((res) => {
                setBirthday(res);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (show) {
            handleGetBirthdays();
        }
    }, [show]);

    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                date: "2000-01-01",
            } as BirthdayFormFields}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                setSubmitting(true);
                patchBirthday({
                    name: `${encodeURIComponent(values.firstName)} ${
                        encodeURIComponent(values.lastName)
                    }`,
                    date: encodeURIComponent(values.date),
                }).then(() => {
                    setSubmitting(false);
                    resetForm();
                    setShow(false);
                    getBirthdays();
                });
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
        >
            {(formik) => (
                <dialog className="modal" open={show}>
                    <div className="modal-box">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => {
                                formik.resetForm();
                                setShow(false);
                            }}
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                        <h3 className="text-lg font-bold">Edit Birthday</h3>
                        <p className="py-4">
                            Please enter the new birthday details below.
                        </p>
                        <BirthdayForm editMode />
                    </div>
                    {/* Backdrop */}
                    <form
                        method="dialog"
                        className="modal-backdrop bg-neutral bg-opacity-40"
                    >
                        <button
                            onClick={() => {
                                formik.resetForm();
                                setShow(false);
                            }}
                        >
                            close
                        </button>
                    </form>
                </dialog>
            )}
        </Formik>
    );
}
export default EditModal;