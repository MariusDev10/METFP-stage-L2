
import React, { useEffect, useRef, useState } from "react";
import '../../styles/app.css';
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import logo from '../../image/republique.jpg';
import ico from '../../image/print.png';
import moment from "moment";
import { async } from "regenerator-runtime";
import axios from "axios";

const PrintPDF = props => {
    const { id } = props.match.params;
    const componentRef = useRef();
    const [mission, setMissions] = useState([]);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Impression de Rapport',
        onAfterPrint: () => toast.success("Impression termine avec succee")
    });
    const date = new Date();
    const fetchMission = async id => {
        try {
            const data = await axios
                .get("http://127.0.0.1:8000/api/missions/" + id)
                .then(Response => Response.data)
                .then(data => setMissions(data));
            console.log(data);
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
            <button className="btn btn-danger" onClick={handlePrint} style={{ position: 'fixed', marginTop: '1cm', zIndex: '2', marginLeft: '1.5cm', width: '2cm' }}>
                <img src={ico} alt="" className="printIco" />
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
                    <h6>Date :</h6>
                    <h6>Destination :</h6>
                    <h6>Objectif : </h6>
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
                                <td>RANDRIANARISON Jacquit Marius</td>
                                <td>Developpeur</td>
                            </tr>
                        </tbody>
                    </table>
                    <h6>Lieux d'Intervention et Coordonnées GPS : </h6>
                    <h6>Contexte : </h6>
                    <h6>Deroulement de la mission :</h6>
                    <h6>Autres activités menées : </h6>
                    <h6>Difficulté rencontrées : </h6>
                    <h6>Suggestions : </h6>
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
                <h6>Antananarivo le : {moment(date).format("DD/MM/YYYY")}</h6>
            </div>


        </>
    );
}

export default PrintPDF;