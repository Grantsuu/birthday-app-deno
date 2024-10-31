interface DeleteModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
}

function DeleteModal({ show, setShow }: DeleteModalProps) {
    return (
        <dialog className="modal" open={show}>
            <div className="modal-box">
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    ✕
                </button>
                <h3 className="text-lg font-bold">Delete Birthday</h3>
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
                        }}
                    >
                        Delete
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
