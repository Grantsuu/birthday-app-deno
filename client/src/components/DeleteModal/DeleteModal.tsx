import { useState } from "react";
import {
    XMarkIcon
} from "@heroicons/react/24/outline";
import {API_HOST} from "../../helpers/constants.ts";

interface DeleteModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    getBirthdays: () => void;
    id: number;
}

function DeleteModal({ show, setShow, getBirthdays, id }: DeleteModalProps) {
    const [loading, setLoading] = useState(false);

    const deleteBirthday = async () => {
        const response = await fetch(
            `${API_HOST}/api/birthday/${id}`,
            {
                method: 'DELETE'
            }
        );
        return await response.json();
    };

    const handleDeleteBirthday = () => {
        setLoading(true);
        // TODO: Need to handle error case on delete
        deleteBirthday()
            .then(() => {
                setShow(false);
                getBirthdays();
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <dialog className="modal" open={show}>
            <div className="modal-box">
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    <XMarkIcon className='h-5 w-5'/>
                </button>
                <h3 className="text-lg font-bold">Confirm Delete</h3>
                <p className="py-4">
                    Are you sure you want to delete this birthday?
                </p>
                <div className="flex justify-end space-x-2">
                    <button
                        className="btn"
                        onClick={() => {
                            setShow(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-error text-neutral-content"
                        onClick={() => {
                            handleDeleteBirthday();
                        }}
                    >{
                        loading ? <span className="loading loading-spinner loading-md" /> : 'Delete'
                    }
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop bg-neutral bg-opacity-40">
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

export default DeleteModal;
