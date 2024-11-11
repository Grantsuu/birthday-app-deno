import { Link } from "react-router-dom";
import UserForm from "../../components/Form/UserForm/UserForm.tsx";

function ResetPassword() {
    return (
        <>
            <UserForm
                formLabel="Reset Password"
                submitLabel="Reset"
                email
            />
            <div className="flex justify-center ml-2">
                <Link to={"/login"}>Back to Login</Link>
            </div>
        </>
    );
}

export default ResetPassword;
