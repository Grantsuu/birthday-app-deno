// @deno-types="@types/react"
import { useEffect, useState } from "react";
import {
    CakeIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { API_HOST, MONTHS } from "./helpers/constants.ts";
import ProfileDropdown from "./components/ProfileDropdown/ProfileDropdown.tsx";
import BirthdayLoader from "./components/BirthdayLoader/BirthdayLoader.tsx";
import DeleteModal from "./components/DeleteModal/DeleteModal.tsx";
import AddModal from "./components/AddModal/AddModal.tsx";

interface Birthday {
    id: number;
    name: string;
    date: string;
}

function App() {
    const [birthdays, setBirthdays] = useState<Birthday[]>();
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [deleteID, setDeleteID] = useState(0);

    const handleShowAddModal = (show: boolean) => {
        setShowAddModal(show);
    };

    const handleShowDeleteModal = (show: boolean) => {
        setShowDeleteModal(show);
    };

    const getBirthdays = async () => {
        const response = await fetch(
            `${API_HOST}/api/birthday/1`,
        );
        return await response.json();
    };

    const handleGetBirthdays = () => {
        setLoading(true);
        getBirthdays()
            .then((res) => {
                setBirthdays(res);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        handleGetBirthdays();
    }, []);

    return (
        <>
            {/* Header */}
            <header className="bg-primary shadow">
                <div className="flex justify-between items-center mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
                    {/* Title */}
                    <div className="flex space-x-2">
                        <img
                            src="/party-popper.svg"
                            className="w-8"
                            alt="brithday popper"
                        />
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Birthday App
                        </h1>
                    </div>
                    {/* Dropdown */}
                    <ProfileDropdown />
                </div>
            </header>
            {/* Body */}
            <main>
                <div className="sm:mx-0 lg:mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th></th>
                                <th className="text-xl">Name</th>
                                <th className="text-xl">Date</th>
                                <th className="flex justify-end">
                                    <button
                                        className="btn bg-blue-400 hover:bg-blue-500 text-neutral-content"
                                        onClick={() => {
                                            setShowAddModal(true);
                                        }}
                                    >
                                        Add Birthday
                                        <CakeIcon className="h-6 w-6" />
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading
                                ? (
                                    <>
                                        <BirthdayLoader />
                                        <BirthdayLoader />
                                        <BirthdayLoader />
                                    </>
                                )
                                : birthdays?.map((birthday, index) => {
                                    const date = new Date(birthday.date);
                                    return (
                                        <tr key={index}>
                                            {/* Number */}
                                            <th>{index + 1}</th>
                                            {/* Name */}
                                            <td>{birthday.name}</td>
                                            {/* Date */}
                                            <td>
                                                {`${
                                                    MONTHS[
                                                        date.getUTCMonth() as keyof typeof MONTHS
                                                    ]
                                                } ${date.getUTCDate()}, ${date.getUTCFullYear()}`}
                                            </td>
                                            {/* Controls */}
                                            <td>
                                                <div className="flex justify-end">
                                                    {/* Edit Button */}
                                                    <button className="btn btn-ghost">
                                                        <PencilSquareIcon className="h-6 w-6 stroke-success" />
                                                    </button>
                                                    {/* Delete Button */}
                                                    <button
                                                        className="btn btn-ghost"
                                                        onClick={() => {
                                                            setShowDeleteModal(
                                                                true,
                                                            );
                                                            setDeleteID(
                                                                birthday.id,
                                                            );
                                                        }}
                                                    >
                                                        <TrashIcon className="h-6 w-6 stroke-error" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </main>
            {/* Delete Modal */}
            <DeleteModal
                show={showDeleteModal}
                setShow={handleShowDeleteModal}
                getBirthdays={handleGetBirthdays}
                id={deleteID}
            />
            <AddModal
                show={showAddModal}
                setShow={handleShowAddModal}
                getBirthdays={handleGetBirthdays}
                id={1}
            />
        </>
    );
}

export default App;
