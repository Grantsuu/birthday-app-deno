// @deno-types="@types/react"
import { useEffect, useState } from "react";
import {
    CakeIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { API_HOST, MONTHS } from "../../helpers/constants.ts";
import { Birthday } from "../../../../server/interfaces.ts";
import { useBirthdayContext } from "../../contexts/BirthdayContext.tsx";
import ProfileDropdown from "../../components/ProfileDropdown/ProfileDropdown.tsx";
import BirthdayLoader from "../../components/BirthdayLoader/BirthdayLoader.tsx";
import AddModal from "../../components/Modals/AddModal/AddModal.tsx";
import EditModal from "../../components/Modals/EditModal/EditModal.tsx";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.tsx";

// interface Birthday {
//     id: number;
//     firstName: string;
//     lastName: string;
//     date: string;
// }

function BirthdayPage() {
    const { setShowAddModal, setShowEditModal, setEditID, setShowDeleteModal, setDeleteID } = useBirthdayContext();
    const [birthdays, setBirthdays] = useState<Birthday[]>();
    const [loading, setLoading] = useState(true);

    const getBirthdays = async (id: number) => {
        const response = await fetch(
            `${API_HOST}/api/birthday/${id}`,
        );
        return await response.json();
    };

    const handleGetBirthdays = () => {
        setLoading(true);
        getBirthdays(1)
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
                    <table className="table table-zebra table-pin-rows">
                        <thead>
                            <tr>
                                <th className="text-xl w-1/3 text-center">
                                    Name
                                </th>
                                <th className="text-xl w-1/3 text-center">
                                    Date
                                </th>
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
                                : birthdays
                                ? birthdays.map((birthday, index) => {
                                    const date = new Date(
                                        birthday.date ? birthday.date : "",
                                    );
                                    return (
                                        <tr key={index}>
                                            {/* Name */}
                                            <td className="text-center">
                                                {`${birthday.firstName} ${birthday.lastName}`}
                                            </td>
                                            {/* Date */}
                                            <td className="text-center">
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
                                                    <button
                                                        className="btn btn-ghost"
                                                        onClick={() => {
                                                            setEditID(
                                                                Number(
                                                                    birthday
                                                                            .id
                                                                        ? birthday
                                                                            .id
                                                                        : 0,
                                                                ),
                                                            );
                                                            setShowEditModal(
                                                                true,
                                                            );
                                                        }}
                                                    >
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
                                                                Number(
                                                                    birthday
                                                                            .id
                                                                        ? birthday
                                                                            .id
                                                                        : 0,
                                                                ),
                                                            );
                                                        }}
                                                    >
                                                        <TrashIcon className="h-6 w-6 stroke-error" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                                : <>No Birthdays found!</>}
                        </tbody>
                    </table>
                </div>
            </main>
            {/* Add Modal */}
            <AddModal
                getBirthdays={handleGetBirthdays}
            />
            {/* Edit Modal */}
            <EditModal
                getBirthdays={handleGetBirthdays}
            />
            {/* Delete Modal */}
            <DeleteModal
                getBirthdays={handleGetBirthdays}
            />
        </>
    );
}

export default BirthdayPage;
