import { useEffect, useState } from "react";
import { Formik } from "formik";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { API_HOST, BIRTHDAY_FORM_SCHEMA } from "../../../helpers/constants.ts";
import { Birthday } from "../../../../../server/interfaces.ts";
import BirthdayForm from "../../Form/BirthdayForm/BirthdayForm.tsx";
import { BirthdayFormFields } from "../../../helpers/interfaces.ts";

interface EditModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    getBirthdays: () => void;
    editID: number;
}

function EditModal({ show, setShow, getBirthdays, editID }: EditModalProps) {
    const [birthday, setBirthday] = useState<Birthday[]>();
    const [loading, setLoading] = useState(true);

    const patchBirthday = async (birthday: Birthday) => {
        const response = await fetch(
            `${API_HOST}/api/birthday/${editID}`,
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

    const getBirthday = async () => {
        const response = await fetch(
            `${API_HOST}/api/birthday?id=${editID}`,
            {
                method: "GET",
            },
        );
        return await response.json();
    };

    const handleGetBirthday = () => {
        setLoading(true);
        getBirthday()
            .then((res) => {
                setBirthday(res[0]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (show) {
            handleGetBirthday();
        }
    }, [show]);

    return (
        <Formik
            enableReinitialize
            initialValues={{
                firstName: birthday && birthday.firstName ? birthday.firstName.split(" ")[0] : "",
                lastName: birthday && birthday.lastName ? birthday.lastName.split(" ")[1] : "",
                date: birthday && birthday.date ? birthday.date.split("T")[0] : "2000-01-01",
            } as BirthdayFormFields}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                setSubmitting(true);
                patchBirthday({
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
                        <h3 className="text-lg font-bold">
                            Edit Birthday
                        </h3>
                        <p className="py-4">
                            Please enter the new birthday details below.
                        </p>
                        {loading
                            ? (
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="skeleton h-8 w-full" />
                                        <div className="skeleton h-8 w-full" />
                                    </div>
                                    <div className="skeleton h-8 w-full" />
                                </div>
                            )
                            : <BirthdayForm setShow={setShow} editMode />}
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
