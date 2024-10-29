import "./App.css";
// @deno-types="@types/react"
// import { useEffect, useState } from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

function App() {
  return (
    <div>
      <header className="bg-primary shadow">
        <div className="flex justify-between items-center mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="flex space-x-2">
            <img src="/party-popper.svg" className="w-8" />
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
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th className="text-xl">Name</th>
                <th className="text-xl">Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>
                  <div className="space-x-2">
                    <button className="btn btn-success">
                      Edit
                    </button>
                    <button className="btn btn-error">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
