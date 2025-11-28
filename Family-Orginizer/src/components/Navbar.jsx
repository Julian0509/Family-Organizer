import { Link, Outlet } from "react-router-dom";
import "../styles/navbar.css"

const Navigation = () => {
    return (
        <>
        <nav className="navbar">
            <Link to="/home">Home</Link>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
        <Outlet/>
        </>
    );
};
export default Navigation;