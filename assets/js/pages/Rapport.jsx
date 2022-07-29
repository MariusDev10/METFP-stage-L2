import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../styles/app.css';
import { toast } from "react-toastify";
import Axios from "axios";
import Field from "../components/Forms/Field";
import { async } from "regenerator-runtime";
const Rapport = props => {
    const { idM = "new" } = props.match.params;

    if (idM !== "new") {
        console.log(+idM);
    }
    const [missions, setMissions] = useState({
        date_mission: "",
        destination: "",
        objectif: "",
        contexte: "",
        suggestion: "",
        deroulement: "",
        lieuIntervation: "",
        coordonneGps: "",
        difficulte: "",
        autre_activite: "",
        /* DEPENSES 
        frais_aller_vers_la_gare: "",
        frais_aller_vers_la_destination: "",
        quantite: "",
        frais_retour_vers_la_gare: "",
        frais_retour_vers_la_destination: "",
        hebergement: "",
        restauration: "",
        */
        remarque: ""
    });

    const [editing, setEditing] = useState(false);

    const fetchMission = async idM => {
        try {
            const data = await Axios
                .get("http://127.0.0.1:8000/api/missions/" + idM)
                .then(Response => Response.data);
            console.log(data);
            const { date_mission, deroulement, coordonneGps, contexte, destination, difficulte, lieuIntervation, objectif, suggestion, autre_activite, remarque } = data;
            setMissions({ date_mission, deroulement, coordonneGps, contexte, destination, difficulte, lieuIntervation, objectif, suggestion, autre_activite, remarque });
        } catch (error) {
            console.log(error.Response);
        }
    }
    useEffect(() => {
        if (idM !== "new") {
            setEditing(true);
            fetchMission(idM);
        }
    }, [idM]);
    const handleChange = (Event) => {
        const value = Event.currentTarget.value;
        const name = Event.currentTarget.name;
        setMissions({ ...missions, [name]: value });
    }

    return (
        <>
            <div className="container-fluid" id="rapport">
                <div className="titre text-center">
                    {!editing && <h4>CREATION D'UN RAPPORT DE MISSION</h4> || <h4>MODIFICATION D'UN RAPPORT DE MISSION</h4>}
                    <Link to="/Listes" className="btn btn-primary btn-sm">Voir les Missions effectuées</Link>
                </div>
                <div className="container-fluid" id="formulaire">
                    <form action="">
                        <div className="rap1">
                            <div className="left">
                                <Field label='Date de Missions' value={missions.date_mission} onChange={handleChange} type="date" name="date_mission" />
                                <Field label="Destination" value={missions.destination} onChange={handleChange} name="destination" />
                                <div className="form-group">
                                    <label>Objectif</label>
                                    <textarea className="form-control" value={missions.objectif} onChange={handleChange} placeholder="Objectif" name="objectif"></textarea>
                                </div>
                                <Field label="Contexte" value={missions.contexte} onChange={handleChange} name="contexte" type="text" />
                                <Field label="Solution" value={missions.suggestion} onChange={handleChange} name="suggestion" type="text" />
                            </div>
                            <div className="right">
                                <div className="form-group">
                                    <label>Deroulement</label>
                                    <textarea className="form-control" value={missions.deroulement} onChange={handleChange} name="deroulement"></textarea>
                                </div>
                                <Field label="Lieu d'intervention" value={missions.lieuIntervation} onChange={handleChange} name="lieuIntervation" type="text" />
                                <Field label="Coordonnée GPS" placeholder="longitude / latitude" value={missions.coordonneGps} onChange={handleChange} name="coordonneGps" type="text" />
                                <Field label="Difficulté" value={missions.difficulte} onChange={handleChange} name="difficulte" type="text" />
                                <Field label="Autre activite Menée" value={missions.autre_activite} onChange={handleChange} name="autre_activite" type="text" />
                            </div>
                        </div>
                        <div className="rap2">
                            <div className="depense">
                                <h5>DEPENSES</h5><hr />
                                <div className="left">
                                    <Field label="Frais de deplacement Aller" placeholder="vers la gare" value={missions.frais_aller_vers_la_gare} onChange={handleChange} name="frais_aller_vers_la_gare" type="number" />
                                    <Field placeholder="vers le lieu de destination" type="number" value={missions.frais_aller_vers_la_destination} onChange={handleChange} name="frais_aller_vers_la_destination" />
                                    <Field label="Hebergement" value={missions.hebergement} onChange={handleChange} name="hebergement" type="number" />
                                </div>
                                <div className="right">
                                    <Field label="Frais de deplacement Retour" placeholder="vers la gare" value={missions.frais_retour_vers_la_gare} onChange={handleChange} name="frais_retour_vers_la_gare" type="number" />
                                    <Field placeholder="vers le lieu de destination" type="number" value={missions.frais_retour_vers_la_destination} onChange={handleChange} name="frais_retour_vers_la_destination" />
                                    <Field label="Restauration" value={missions.restauration} onChange={handleChange} name="restauration" type="number" />
                                    <Field label="Quantité" value={missions.quantite} onChange={handleChange} name="quantite" type="number" />
                                </div>
                                <Field label="Remarque" value={missions.remarque} onChange={handleChange} name="remarque" type="text" />
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success btn-sm">Envoyer par Email</button>
                                    <button type="submit" className="btn btn-danger btn-sm">Rapporter</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Rapport;