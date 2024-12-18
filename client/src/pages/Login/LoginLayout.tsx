import { Outlet } from "react-router-dom";

function LoginLayout() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
            <div className="flex flex-row gap-2">
                <img
                    src="/party-popper.svg"
                    className="w-8"
                    alt="brithday popper"
                />
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                    Birthday App
                </h1>
            </div>
            <div className="flex w-1/4 justify-center">
                <div className="card-compact rounded-box  w-full shadow-xl bg-base-200">
                    <div className="card-body">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginLayout;
