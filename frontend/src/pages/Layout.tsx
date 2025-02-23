import Header from "@components/Header.tsx";
import {Outlet} from "react-router-dom";


const Layout = () => {
    return (
        <>
            <Header/>
            <div className="container-fluid">
                <Outlet/>
            </div>
        </>
    )
}

export default Layout;
