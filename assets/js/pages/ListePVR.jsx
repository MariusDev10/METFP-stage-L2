import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/loaders/loader";

/**importation des images */
import add from '../../image/add.png';

const ListesMission = () => {

    const formatDate = (str) => moment(str).format("DD/MM/YYYY");
    const [reunions, setReunions] = useState([]);
    const [Loading, setLoading] = useState(true);

    //GET LISTE PV REUNION
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/reunions")
            .then(Response => Response.data["hydra:member"])
            .then(data => setReunions(data))
            .then(data => setLoading(false));
        toast.info("Voici la liste des PV Reunion Existants");
    }, []);

    return (
        <>
            <div>
                <div className="container" id="cherc">

                    <form className="form-group">
                        <input type="text" placeholder="Recherche objet" className="form-control" />
                        <button type="submit" className="btn btn-success">Chercher</button>
                    </form>
                    <Link to="/pvReunion/new" className="btn btn-success btn-sm mb-4">
                        <i><img src={add} alt="" style={{ width: '0.3cm' }} /> </i>
                        Nouveau PV reunion
                    </Link>
                    <h4>LISTES DES PV REUNION EXISTANTS</h4>
                </div>
                <div className="container-fluid mt-2" id="liste">
                    <table className="table table-hover table-striped table-bordered" id="table1">
                        <thead>
                            <tr className="head">
                                <th>Objet</th>
                                <th>Date</th>
                                <th>Lieu</th>
                                <th>Participant</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {!Loading && <tbody>
                            {reunions.map(reunion =>
                                <tr key={reunion.id} >
                                    <td>{reunion.objet}</td>
                                    <td>{formatDate(reunion.date)}</td>
                                    <td>{reunion.lieu}</td>
                                    <td>{reunion.participants}</td>
                                    <td>
                                        <NavLink to={"/printPVR/" + reunion.id}><button className="btn btn-sm btn-success mt-2">Imprimer</button></NavLink>
                                        <NavLink to={"/pvReunion/" + reunion.id}><button className="btn btn-sm btn-default mt-2" style={{ border: '1px solid', marginLeft: '0.1cm' }}>modifier</button></NavLink>
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