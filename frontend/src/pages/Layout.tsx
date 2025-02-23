import Header from "@components/Header.tsx";
import {Outlet} from "react-router-dom";


const Layout = () => {
    return (
        <>
            <Header/>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="main-content row">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout;
