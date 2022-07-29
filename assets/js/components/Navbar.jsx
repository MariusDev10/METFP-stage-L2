import React from "react";
import { NavLink } from "react-router-dom";
import '../../styles/app.css';

/**imporation des images */
import add from '../../image/add.png';

const Navbar = ({ isAuthenticated }) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary" id="Nav">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">METFP</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        {isAuthenticated && <>
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#/home">
                                        <button className="btn btn-default active" style={{ border: 'solid 1px white', fontSize: '0.7em', fontWeight: 'bold' }}>Acceuil</button>
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#/pvReunion">
                                        <button className="btn btn-default" style={{ border: 'solid 1px white', fontSize: '0.7em', fontWeight: 'bold' }}>
                                            <i><img src={add} alt="" style={{ width: '0.3cm' }} />  </i>
                                            PV reunion
                                        </button>
                                    </a>
                                </li>

                            </ul>
                        </> || (
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item">
                                        <a className="nav-link">...</a>
                                    </li>

                                </ul>
                            )}
                        <div className="d-flex">
                            {!isAuthenticated && <>
                                <NavLink to="/Compte"><button className="btn btn-light my-2 my-sm-0" type="submit" id="insc">Inscription</button></NavLink>
                                <NavLink to="/login"><button className="btn btn-primary my-2 my-sm-0 ml-5" type="submit">Connexion</button></NavLink>

                            </> || (
                                    <button className="btn btn-danger btn-sm" disabled>connected</button>
                                )}
                        </div>
                    </div>
                </div>
            </nav>

        </>
    );
}
export default Navbar;