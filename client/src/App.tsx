import "./App.css";
// @deno-types="@types/react"
import { useEffect, useState } from "react";
import {
    ArrowLeftStartOnRectangleIcon,
    CakeIcon,
    PencilSquareIcon,
    TrashIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { API_HOST } from "./helpers/constants.ts";
import DeleteModal from "./components/DeleteModal/DeleteModal.tsx";

interface Birthday {
    id: number;
    name: string;
    date: string;
}

const Months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
};

function App() {
    const [birthdays, setBirthdays] = useState<Birthday[]>();
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleShowDeleteModal = (show: boolean) => {
        setShowDeleteModal(show);
    }

    const getBirthdays = async () => {
        const response = await fetch(
            `${API_HOST}/api/birthday/1`,
        );
        return await response.json();
    };

    useEffect(() => {
        setLoading(true);
        getBirthdays()
            .then((res) => {
                console.log(res);
                setBirthdays(res);
            })
            .finally(() => {
                setLoading(false);
            });
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
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button">
                            {/* Avatar */}
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content w-14 rounded-full border-2 border-neutral-content">
                                    <span className="text-3xl">B</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow bg-neutral text-neutral-content border-2 border-neutral-content"
                            >
                                <div className="text-center text-lg">
                                    Name Nameson
                                </div>
                                <div className="divider my-0" />
                                <li>
                                    <a className="justify-between">
                                        Edit Profile
                                        <UserIcon className="h-6 w-6 mx-1 stroke-neutral-content" />
                                    </a>
                                </li>
                                <li>
                                    <a className="justify-between">
                                        Sign Out
                                        <ArrowLeftStartOnRectangleIcon className="h-6 w-6 mx-1 stroke-neutral-content" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
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
                                    <button className="btn bg-blue-400 hover:bg-blue-500 text-neutral-content">
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
                                        <tr>
                                            <td></td>
                                            <td>
                                                <div className="skeleton h-5 w-4/5" />
                                            </td>
                                            <td>
                                                <div className="skeleton h-5 w-4/5" />
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                                <div className="skeleton h-5 w-4/5" />
                                            </td>
                                            <td>
                                                <div className="skeleton h-5 w-4/5" />
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                                <div className="skeleton h-5 w-4/5" />
                                            </td>
                                            <td>
                                                <div className="skeleton h-5 w-4/5" />
                                            </td>
                                            <td></td>
                                        </tr>
                                    </>
                                )
                                : birthdays?.map((birthday, index) => {
                                    const date = new Date(birthday.date);
                                    return (
                                        <tr>
                                            <th>{index + 1}</th>
                                            <td>{birthday.name}</td>
                                            <td>
                                                {`${
                                                    Months[
                                                        date.getUTCMonth() as keyof typeof Months
                                                    ]
                                                } ${date.getUTCDate()}, ${date.getUTCFullYear()}`}
                                            </td>
                                            <td>
                                                <div className="flex justify-end">
                                                    <button className="btn btn-ghost">
                                                        <PencilSquareIcon className="h-6 w-6 stroke-success" />
                                                    </button>
                                                    <button
                                                        className="btn btn-ghost"
                                                        onClick={() => {
                                                            setShowDeleteModal(true);
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
            <DeleteModal show={showDeleteModal} setShow={handleShowDeleteModal}/>
        </>
    );
}

export default App;
