import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { API_HOST } from "../../../helpers/constants.ts";
import { useBirthdayContext } from "../../../contexts/BirthdayContext.tsx";

interface DeleteModalProps {
    getBirthdays: () => void;
}

function DeleteModal({ getBirthdays }: DeleteModalProps) {
    const { showDeleteModal, setShowDeleteModal, deleteID } = useBirthdayContext();

    const [loading, setLoading] = useState(false);

    const deleteBirthday = async () => {
        const response = await fetch(
            `${API_HOST}/api/birthday/${deleteID}`,
            {
                method: "DELETE",
            },
        );
        return await response.json();
    };

    const handleDeleteBirthday = () => {
        setLoading(true);
        // TODO: Need to handle error case on delete
        deleteBirthday()
            .then(() => {
                setShowDeleteModal(false);
                getBirthdays();
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <dialog className="modal" open={showDeleteModal}>
            <div className="modal-box">
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => {
                        setShowDeleteModal(false);
                    }}
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>
                <h3 className="text-lg font-bold">Confirm Delete</h3>
                <p className="py-4">
                    Are you sure you want to delete this birthday?
                </p>
                <div className="flex justify-end space-x-2">
                    <button
                        className="btn"
                        onClick={() => {
                            setShowDeleteModal(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-error text-neutral-content"
                        onClick={() => {
                            handleDeleteBirthday();
                        }}
                    >
                        {loading
                            ? (
                                <span className="loading loading-spinner loading-md" />
                            )
                            : "Delete"}
                    </button>
                </div>
            </div>
            <form
                method="dialog"
                className="modal-backdrop bg-neutral bg-opacity-40"
            >
                <button
                    onClick={() => {
                        setShowDeleteModal(false);
                    }}
                >
                    close
                </button>
            </form>
        </dialog>
    );
}

export default DeleteModal;
