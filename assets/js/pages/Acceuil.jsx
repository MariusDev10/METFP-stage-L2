import React from "react";
import { NavLink } from "react-router-dom";
import '../../styles/app.css';
import { toast } from "react-toastify";

/**importation des images */
import logo from '../../image/design.png';
import rep from '../../image/republique.jpg';
const Acceuil = () => {

    toast.success("BIENVENUE SUR METFP (RAPPORT DE MISSION)")
    return (
        <>
            <div className="container mt-9" id="acc">
                <div id="img" className="col-sm-6">
                    <img src={rep} alt="" className="img-fluid" />
                    <NavLink to="/login"><button className="btn btn-success">Get started</button></NavLink>
                    <h3>RAPPORT DE MISSION</h3>
                </div>
                <div className="design col-sm-6">
                    <img src={logo} alt="" className="img-fluid" />
                </div>
            </div>
            <footer style={{ height: '1.5cm', backgroundColor: ' #20bcaf', marginTop: '1.3cm', textAlign: 'center' }}>
                <p style={{ fontSize: '0.7em', color: 'white', paddingTop: '0.5cm' }}>Ministere de l'enseignement Technique et de Formation Professionnelle Copyright 2022</p>
            </footer>
        </>
    )
}

export default Acceuil;