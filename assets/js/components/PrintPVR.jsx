
import React, { useEffect, useRef, useState } from "react";
import '../../styles/app.css';
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import logo from '../../image/republique.jpg';
import ico from '../../image/print.png';
import moment from "moment";
import { async } from "regenerator-runtime";
import axios from "axios";


const PrintPVR = props => {
    const { idR } = props.match.params;
    const [pvReunion, setPvReunion] = useState({
        date_mission: "",
        contexte: "",
        lieuIntervation: "",
        objectif: "",
    });
    const formatDate = (str) => moment(str).format("DD/MM/YYYY");
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Impression PVR',
        onAfterPrint: () => toast.success("Impression termine avec succee")
    });
    const date = new Date();
    // GET PV REUNION
    const fetchReunion = async idR => {
        try {
            const data = await axios
                .get("http://127.0.0.1:8000/api/missions/" + idR)
                .then(Response => Response.data);
            const { date_mission, contexte, lieuIntervation, objectif } = data;
            setPvReunion({ date_mission, contexte, lieuIntervation, objectif });
        } catch (error) {
            console.log(error.Response);
        }
    }
    useEffect(() => {
        if (idR != 'new') {
            fetchReunion(idR);
        }
    }, [idR]);

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
                    <h6>MINISTERE DE L’ENSEIGNEMENT TECHNIQUE ET DE LA FORMATION PROFESSIONNELLE<br /> --------</h6>
                    <h6>COORDINATION GENERALE DES PROGRAMMES ET PROJETS <br /> --------</h6>
                    <h6>DIRECTION DE L'INNOVATION ET DU DEVELOPPEMENT NUMERIQUE <br />-------</h6>
                </div>
                <div className="tittle">
                    <h3>PV REUNION METFP</h3>
                </div>
                <div className="content2" style={{ marginTop: '8cm', marginBottom: "1.5cm" }}>
                    <h6>Objet: <b className="resultat">{pvReunion.objectif}</b></h6>
                    <h6>Lieu : <b className="resultat">{pvReunion.lieuIntervation}</b></h6>
                    <h6>Date : <b className="resultat">{formatDate(pvReunion.date_mission)}</b></h6>
                    <h6>Participants : <b className="resultat">{pvReunion.contexte}</b></h6>
                </div>
            </div>

        </>
    );
}

export default PrintPVR;