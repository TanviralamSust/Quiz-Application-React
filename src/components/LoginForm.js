import TextInput from "./TextInput";
import Button from "./Button";
import Form from "./Form";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import classes from "../styles/Login.module.css";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState();
    const navigate = useNavigate();


    const {login} = useAuth();
    async function handleSubmit(e) {
        e.preventDefault();

        try{
            setError("");
            setLoading(true);
            await login(email, password);
            navigate("/");
        }catch (err) {
            setLoading(false);
            setError("Falied to login!")
        }

    }
    return(
        <Form className={`${classes.login}`} onSubmit={handleSubmit}>
            <TextInput
                type="text"
                placeholder="Enter email"
                icon="alternate_email"
                value={email}
                onChange={(e)=> {
                    setEmail(e.target.value)
                }}
            />

            <TextInput type="password" placeholder="Enter password" icon="lock" value={password} onChange={(e)=>{
            setPassword(e.target.value)
            }} />

            <Button disabled={loading} type="submit"><span>Submit Now</span></Button>
            {error && <p className="error">{error}</p>}
            <div className="info">
                Don't have an account? <a href="signup.html">Signup</a> instead.
            </div>
        </Form>
    )
}