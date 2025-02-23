import Sidebar from "@components/Sidebar.tsx";
import {Outlet} from "react-router-dom";

const Work = () => {
    return (
        <>
            <div className="col-4 d-none d-md-block sidebar">
                <Sidebar/>
            </div>
            <div className="col work-content d-flex justify-content-center">
                <Outlet/>
            </div>
        </>
    )
};

export default Work;