import classes from "../../styles/Signup.module.css";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Form from "../Form";
import Illustration from "../Illustration";
import TextInput from "../TextInput";

export default function Signup() {

    return (
        <>
            <h1>Create an Account</h1>

            <div className="column">
                <Illustration></Illustration>
                <Form className={`${classes.signup}`}>
                    <TextInput type="text" placeholder="Enter Name" icon="person"></TextInput>
                    <TextInput type="text" placeholder="Enter Email" icon="alternate_email"></TextInput>
                    <TextInput type="password" placeholder="Enter password" icon="lock"/>
                    <TextInput
                        type="password"
                        placeholder="Confirm password"
                        icon="lock_clock"
                    />
                    <Checkbox text="I agree to the Terms &amp; Conditions"></Checkbox>
                    <Button><span>Submit Now</span></Button>

                    <div className="info">
                        Already have an account? <a>Login</a> instead?
                    </div>
                </Form>
            </div>
        </>
    )
}