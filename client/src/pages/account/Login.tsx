import { Link } from "react-router-dom";
import UserForm from "../../components/Form/UserForm/UserForm.tsx";

function Login() {
    return (
        <>
            <UserForm
                formLabel="Login"
                submitLabel="Login"
                email
                forgotPassword
                password
            />
            <Link to={"/register"}>
                <div className="flex justify-center ml-2">
                    Register a new account
                </div>
            </Link>
        </>
    );
}

export default Login;
