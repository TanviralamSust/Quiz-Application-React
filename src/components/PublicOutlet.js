import {useAuth} from "../contexts/AuthContext";
import {Outlet, Navigate} from "react-router-dom";

export default function PublicOutlet() {
    const {currentUser} = useAuth()

    return !currentUser ? <Outlet/> : <Navigate to="/"/>
}