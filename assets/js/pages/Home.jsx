import React, { useEffect, useState } from "react";
import stat from '../../image/stat.png';
import compte from '../../image/user.webp';
import logo from '../../image/logo.png';
import rapport from '../../image/rapp.png';
import depense from '../../image/dep.png';
import '../../styles/app.css';
import axios from "axios";
import add from '../../image/add.png';
import list from '../../image/list.svg';
import authAPI from "../services/authAPI";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import Loader from "../components/loaders/loader";



const Home = ({ history }) => {
    //GET MISSIONS
    const [missions, setMissions] = useState([]);
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/missions")
            .then(Response => Response.data["hydra:member"])
            .then(data => setMissions(data))
            .then(data => setLoading(false))
    }, []);
    //GET USER COMPTE
    const handleLogout = () => {
        authAPI.logout();
        history.replace("/login");
        toast.info("Actualiser votre navigateur pour assurer votre deconnection")
    }
    const date = new Date();
    const formatDate = (str) => moment(str).format("DD/MM/YYYY");

    return (
        <>

            <div id="contenu">
                <div className="map1">
                    <div className="porte-logo">
                        <img src={logo} alt="" className="logo img-fluid" />
                    </div>
                    <NavLink to="/Rapport"><button className="btn btn-success"><i><img src={add} alt="" /></i>  Nouveau rapport</button></NavLink>
                    <NavLink to="/Listes"><button className="btn btn-success"><i><img src={list} alt="" /></i>  Liste des missions</button></NavLink>
                    <NavLink to="/ListePVR"><button className="btn btn-success"><i><img src={list} alt="" /></i> Listes PV reunion</button></NavLink>
                    <button className="btn btn-danger" onClick={handleLogout}>Deconnection</button>
                </div>

                <div className="center">
                    <p> Ministère de l'Enseignement Technique et de Formation Proffesionnelle</p>
                    <ul>
                        <li>
                            <div className="one">
                                <img src={stat} id="logo-stat" className="img-fluid" />
                                <h5>MISSION</h5>

                            </div>
                        </li>
                        <li>
                            <div className="one">
                                <img src={depense} id="logo-stat" className="img-fluid" />
                                <h5>PV REUNION</h5>
                            </div>
                        </li>
                        <li>
                            <div className="one">
                                <img src={rapport} id="logo-stat" className="img-fluid" />
                                <h5>RAPPORT</h5>
                            </div>
                        </li>
                    </ul>
                    <h6>VOS MISSIONS RECENTES</h6>
                    <div className="liste">
                        <table className="table table-hover" id="table">
                            <thead>
                                <tr className="head">
                                    <th>Destination</th>
                                    <th>Date</th>
                                    <th>Lieu</th>
                                    <th>GPS</th>
                                    <th>Objectif</th>
                                    <th>Rapport</th>
                                </tr>
                            </thead>
                            {!Loading && <tbody>
                                {missions.map(mission =>
                                    <tr key={mission.id} >
                                        <td>{mission.destination}</td>
                                        <td>{formatDate(mission.date_mission)}</td>
                                        <td>{mission.lieu_intervation}</td>
                                        <td>{mission.coordonne_gps}</td>
                                        <td>{mission.objectif}</td>
                                        <td>
                                            <NavLink to={"/print/" + mission.id}><button className="btn btn-sm btn-danger mt-2">Imprimer</button></NavLink>
                                        </td>
                                    </tr>
                                )}
                            </tbody>}
                        </table>
                        {Loading && <Loader />}
                    </div>
                </div>

            </div>


        </>


    );
};
export default Home;