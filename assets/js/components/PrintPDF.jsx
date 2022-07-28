
import React, { useEffect, useRef, useState } from "react";
import '../../styles/app.css';
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import moment from "moment";
import { async } from "regenerator-runtime";
import axios from "axios";

/**importation des images */
import logo from '../../image/republique.jpg';
import ico from '../../image/print.png';

const PrintPDF = props => {

    const formatDate = (str) => moment(str).format("DD/MM/YYYY");
    const date = new Date();

    const { id } = props.match.params;

    const [missions, setMissions] = useState({
        date_mission: "",
        deroulement: "",
        coordonneGps: "",
        contexte: "",
        destination: "",
        difficulte: "",
        lieuIntervation: "",
        objectif: "",
        suggestion: "",
        autre_activite: "",
        missionnaire: ""
    });

    //GESTION D'IMPRESSION EN REACT
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Impression de Rapport',
        onAfterPrint: () => toast.success("Impression termine avec succee")
    });

    //GET RAPPORT (MISSIONS)
    const fetchMission = async id => {
        try {
            const data = await axios
                .get("http://127.0.0.1:8000/api/missions/" + id)
                .then(Response => Response.data);
            console.log(data);
            const { date_mission, deroulement, coordonneGps, contexte, destination, difficulte, lieuIntervation, objectif, suggestion, autre_activite, missionnaire } = data;
            setMissions({ date_mission, deroulement, coordonneGps, contexte, destination, difficulte, lieuIntervation, objectif, suggestion, autre_activite, missionnaire });
        } catch (error) {
            console.log(error.Response);
        }
    }
    useEffect(() => {
        if (id != 'new') {
            fetchMission(id);
        }
    }, [id]);
    return (
        <>
            <button className="btn btn-danger btn-sm" onClick={handlePrint} style={{ position: 'fixed', marginTop: '1cm', zIndex: '2', marginLeft: '1.5cm', width: '2cm' }}>
                <img src={ico} style={{ width: '0.5cm' }} />
                imprimer
            </button>
            <div ref={componentRef} style={{ width: '100%', height: 'auto', padding: '1cm' }} className="print">
                <div className="logo3">
                    <img src={logo} alt="" className="impreLogo" />
                </div>
                <div className="description">
                    <h6>MINISTERE DE L'ENSEIGNEMENT TECHNIQUE ET DE FORMATION PROFESSIONNELLE <br /> --------</h6>
                    <h6>SECRETARIAT GENERALE <br /> --------</h6>
                    <h6>DIRECTION DE L'INNOVATION ET DU DEVELOPPEMENT NUMERIQUE <br />-------</h6>
                </div>
                <div className="tittle">
                    <h3>RAPPORT DE MISSION</h3>
                </div>

                <div className="content2">
                    <h6>Date : <b className="resultat">{formatDate(missions.date_mission)}</b></h6>
                    <h6>Destination : <b className="resultat">{missions.destination}</b></h6>
                    <h6>Objectif : <b className="resultat">{missions.objectif}</b></h6>
                    <h6 className="mt-5">Missionnaire</h6>
                    <table className="table table-bordered mb-4 text-center" border={2}>
                        <thead>
                            <tr>
                                <td>Nom et prenom</td>
                                <td>Fonction</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{missions.missionnaire}</td>
                                <td>Developpeur</td>
                            </tr>
                        </tbody>
                    </table>
                    <h6>Lieux d'Intervention et Coordonnées GPS : <b className="resultat">{missions.lieuIntervation} / {missions.coordonneGps}</b></h6>
                    <h6>Contexte : <b className="resultat">{missions.contexte}</b></h6>
                    <h6>Deroulement de la mission : <b className="resultat">{missions.deroulement}</b></h6>
                    <h6>Autres activités menées : <b className="resultat">{missions.autre_activite}</b></h6>
                    <h6>Difficulté rencontrées : <b className="resultat">{missions.difficulte}</b></h6>
                    <h6>Suggestions : <b className="resultat">{missions.suggestion}</b></h6>
                    <h6>Depenses liées à la Mission</h6>
                    <table className="table table-bordered mt-4 mb-3 p-13" border={2}>
                        <tbody>


                            <tr>
                                <td>Designation</td>
                                <td>Prix Unitaire</td>
                                <td>Quantité</td>
                                <td>Montant Total</td>
                            </tr>
                            <tr>
                                <td>
                                    1.Frais de deplacement
                                    <ul>
                                        <li>
                                            Aller :
                                            <ul>
                                                <li>Vers la Gare : ......</li>
                                                <li>Vers le lieu de destination : .....</li>
                                            </ul>
                                        </li>
                                        <li>
                                            Retour :
                                            <ul>
                                                <li>Vers la Gare : ......</li>
                                                <li>Vers le lieu de destination : .....</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>2.Hebergement</td>
                                <td></td>
                                <td></td>
                                <td></td>

                            </tr>
                            <tr>
                                <td>3.Restauration</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h6><u>Remarque : </u></h6>
                <h6>Antananarivo le : <b className="resultat">{moment(date).format("DD/MM/YYYY")}</b></h6>
            </div>


        </>
    );
}

export default PrintPDF;