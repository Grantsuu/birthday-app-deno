import {
    ArrowLeftStartOnRectangleIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

function ProfileDropdown() {
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
                {/* Avatar */}
                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-14 rounded-full border-2 border-neutral-content">
                        <span className="text-3xl">B</span>
                    </div>
                </div>
            </div>
            {/* Dropdown Content */}
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
                            <UserIcon className="h-6 w-6 stroke-neutral-content" />
                        </a>
                    </li>
                    <li>
                        <a className="justify-between">
                            Sign Out
                            <ArrowLeftStartOnRectangleIcon className="h-6 w-6 stroke-neutral-content" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ProfileDropdown;
