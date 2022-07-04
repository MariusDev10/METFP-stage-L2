import React, { useEffect, useState } from "react";
import stat from '../../image/stat.png';
import compte from '../../image/user.webp';
import logo from '../../image/logo.png';
import rapport from '../../image/rapp.png';
import depense from '../../image/dep.png';
import '../../styles/app.css';
import axios from "axios";

const Home = props => {
    const [missions, setMissions] = useState([]);
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/missions")
            .then(Response => Response.data["hydra:member"])
            .then(data => setMissions(data));
    }, []);
    return (
        <div className="container-fluid" id="contenu">
            <div className="map1">
                <div className="porte-logo">
                    <img src={logo} alt="" className="logo" />
                </div>
                <button className="btn btn-success">Nouveau Rapport</button>
                <button className="btn btn-success">Liste des Missions</button>
            </div>
            <div className="map2">
                <h4>COMPTE</h4>
                <img src={compte} id="logo-stat2" />
                <p>RANDRIANARISON jacquit Marius</p>
                <button className="btn btn-success">Deconnection</button><hr />
            </div>
            <div className="center">
                <p> Ministere de l'Enseignement Technique et de Formation Proffesionnel - RAPPORT DE MISSION</p>
                <ul>
                    <li>
                        <div className="one">
                            <img src={stat} id="logo-stat" />
                            <h5>STATISTIQUE</h5>
                        </div>
                    </li>
                    <li>
                        <div className="one">
                            <img src={depense} id="logo-stat" />
                            <h5>DEPENSES</h5>
                        </div>
                    </li>
                    <li>
                        <div className="one">
                            <img src={rapport} id="logo-stat" />
                            <h5>RAPPORT</h5>
                        </div>
                    </li>
                </ul>
                <h6>VOS MISSIONS RECENTES</h6>
                <div className="liste">
                    <table className="table table-hover" id="table">
                        <thead>
                            <tr className="head">
                                <th>id</th>
                                <th>Destination</th>
                                <th>Date de Mission</th>
                                <th>Lieu</th>
                                <th>GPS</th>
                                <th>Objectif</th>
                                <th>Rapport</th>
                            </tr>

                        </thead>
                        <tbody>
                            {missions.map(mission =>
                                <tr key={mission.id}>
                                    <td>{mission.id}</td>
                                    <td>{mission.destination}</td>
                                    <td>{mission.date_mission}</td>
                                    <td>{mission.lieu_intervation}</td>
                                    <td>{mission.coordonne_gps}</td>
                                    <td>{mission.objectif}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary mt-3">Imprimer</button>
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>

                </div>
                <p>Page suivant.. </p>
            </div>
        </div>

    );
};
export default Home;