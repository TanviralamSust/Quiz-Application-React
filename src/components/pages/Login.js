import LoginForm from "../LoginForm";
import Illustration from "../Illustration";

export default function Signup() {
    return(
        <>
            <h1>Login to your account</h1>

            <div className="column">
                <Illustration />
                <LoginForm/>
            </div>
        </>
    )
}