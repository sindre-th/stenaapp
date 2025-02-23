import Admin from "@svg/Admin.tsx";
import Logout from "@svg/Logout.tsx";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className="mb-4">
            <nav className="navbar d-none d-md-block top-menu navbar-expand-md">
                <div className="container-fluid">
                    <div className="row ms-auto">
                        <Link className="col icon-link" to="admin">
                            <span>ADMIN</span>
                            <Admin aria-hidden="true"/>
                        </Link>
                        <Link className="col icon-link" to="/">
                            <span>LOGG UT</span>
                            <Logout aria-hidden="true"/>
                        </Link>
                    </div>
                </div>
            </nav>
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="col logo-container">
                        <a className="navbar-brand" href="/">
                            <img src={"logo.svg"}
                                 alt="Logo"
                                 className="logo d-inline-block align-content-start"/>
                        </a>
                    </div>
                    <button className="navbar-toggler d-md-none" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-md-none" id="navbarNav">
                        <div className="d-flex">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="col nav-link icon-link" to="admin">
                                        <span>ADMIN</span>
                                        <Admin aria-hidden="true"/>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="col nav-link icon-link" to="/">
                                        <span>LOGG UT</span>
                                        <Logout aria-hidden="true"/>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;