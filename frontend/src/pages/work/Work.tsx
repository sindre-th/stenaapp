import Sidebar from "@components/Sidebar.tsx";
import {Outlet} from "react-router-dom";

const Work = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-4 d-none d-md-block sidebar">
                <Sidebar/>
            </div>
            <div className="col d-flex justify-content-center main-content">
                <Outlet/>
            </div>
        </div>
    )
};

export default Work;