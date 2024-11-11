import { XMarkIcon } from "@heroicons/react/24/outline";
import { API_HOST } from "../../../helpers/constants.ts";
import { Birthday } from "../../../../../server/interfaces.ts";
import BirthdayForm from "../../Form/BirthdayForm/BirthdayForm.tsx";

interface AddModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    getBirthdays: () => void;
}

function AddModal({ show, setShow, getBirthdays }: AddModalProps) {
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
                        // formik.resetForm();
                        setShow(false);
                    }}
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>
                <h3 className="text-lg font-bold">Add Birthday</h3>
                <p className="py-4">
                    Please enter the birthday details below.
                </p>
                <BirthdayForm
                    setShow={setShow}
                    handleSubmit={addBirthday}
                    getBirthdays={getBirthdays}
                />
            </div>
            {/* Backdrop */}
            <form
                method="dialog"
                className="modal-backdrop bg-neutral bg-opacity-40"
            >
                <button
                    onClick={() => {
                        // formik.resetForm();
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
