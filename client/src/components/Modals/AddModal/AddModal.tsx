import { XMarkIcon } from "@heroicons/react/24/outline";
import { API_HOST } from "../../../helpers/constants.ts";
import { Birthday } from "../../../../../server/interfaces.ts";
import { useBirthdayContext } from "../../../contexts/BirthdayContext.tsx";
import BirthdayForm from "../../Form/BirthdayForm/BirthdayForm.tsx";

interface AddModalProps {
    getBirthdays: () => void;
}

function AddModal({ getBirthdays }: AddModalProps) {
    const { showAddModal, setShowAddModal, birthdayFormikRef } = useBirthdayContext();

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
        <dialog className="modal" open={showAddModal}>
            <div className="modal-box">
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => {
                        birthdayFormikRef?.current?.resetForm();
                        setShowAddModal(false);
                    }}
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>
                <h3 className="text-lg font-bold">Add Birthday</h3>
                <p className="py-4">
                    Please enter the birthday details below.
                </p>
                <BirthdayForm
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
                        birthdayFormikRef?.current?.resetForm();
                        setShowAddModal(false);
                    }}
                >
                    close
                </button>
            </form>
        </dialog>
    );
}
export default AddModal;
