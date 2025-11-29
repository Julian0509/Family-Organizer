import { Link, Outlet } from "react-router-dom";
import "../styles/styling.css";


const Navigation = () => {
    return (
        <>
        <nav className="flex gap-10 items-center">
            <Link to="/home" className="hover:text-gray-300 transition">Home</Link>
            <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
            <Link to="/register" className="hover:text-gray-300 transition">Register</Link>
            <Link to="/events" className="hover:text-gray-300 transition">Events</Link>
        </nav>
        <Outlet/>
        </>
    );
};
export default Navigation;