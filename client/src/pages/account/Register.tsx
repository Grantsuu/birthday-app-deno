import { Link } from "react-router-dom";
import UserForm from "../../components/Form/UserForm/UserForm.tsx";

function Register() {
    return (
        <>
            <UserForm
                formLabel="Register Account"
                submitLabel="Register"
                name
                email
                phone
                password
                confirmPassword
            />
            <div className="flex justify-center ml-2">
                <Link to={"/login"}>Return to Login</Link>
            </div>
        </>
    );
}

export default Register;
