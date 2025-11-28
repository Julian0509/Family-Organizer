import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div>
            <div>
            <Header />
            </div>

            <main>
            </main>
        </div>
    )
}
export default Layout;