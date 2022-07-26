import React, { useEffect, useState } from "react";
import axios from "axios";
import add from '../../image/add.png';
import moment from "moment";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/loaders/loader";
const ListesMission = () => {
    //GET MISSIONS
    const [missions, setMissions] = useState([]);
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/missions")
            .then(Response => Response.data["hydra:member"])
            .then(data => setMissions(data))
            .then(data => setLoading(false));
        toast.info("Voici la liste de vos Missions");
    }, []);

    const formatDate = (str) => moment(str).format("DD/MM/YYYY");
    return (
        <>
            <div>
                <div className="container" id="cherc">

                    <form className="form-group">
                        <input type="text" placeholder="Recherche..." className="form-control" />
                        <button type="submit" className="btn btn-success">Chercher</button>
                    </form>
                    <Link to="/Rapport" className="btn btn-success btn-sm mb-4">
                        <i><img src={add} alt="" style={{ width: '0.3cm' }} /> </i>
                        Creer un nouveau Rapport
                    </Link>
                    <h4>LISTES DE VOS MISSIONS</h4>
                </div>
                <div className="container-fluid  mt-2" id="liste">

                    <table className="table table-hover table-bordered table-striped" id="table1">
                        <thead>
                            <tr className="head">
                                <th>Destination</th>
                                <th>Date</th>
                                <th>Lieu</th>
                                <th>GPS</th>
                                <th>Objectif</th>
                                <th>Contexte</th>
                                <th>Missionnaire</th>
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
                                    <td>{mission.contexte}</td>
                                    <td>{mission.missionnaire_id}</td>
                                    <td>
                                        <NavLink to={"/print/" + mission.id}><button className="btn btn-sm btn-success mt-2">Imprimer</button></NavLink>
                                    </td>
                                </tr>
                            )}

                        </tbody>}
                    </table>
                    {Loading && <Loader />}
                </div>
            </div>
            <footer style={{ height: '1.5cm', backgroundColor: ' #20bcaf', marginTop: '1.3cm', textAlign: 'center' }}>
                <p style={{ fontSize: '0.7em', color: 'white', paddingTop: '0.5cm' }}>Ministere de l'enseignement Technique et de Formation Professionnelle Copyright 2022</p>
            </footer>
        </>
    );
}

export default ListesMission;