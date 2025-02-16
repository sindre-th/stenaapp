const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-md bg-body-tertiary">
                <div className="container-fluid">
                    <span>Logg ut</span>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={"logo.svg"}
                             alt="Logo"
                             height="100"
                             className="d-inline-block align-content-center"/>
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default Header;