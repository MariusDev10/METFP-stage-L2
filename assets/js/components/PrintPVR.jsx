
import React, { useRef } from "react";
import '../../styles/app.css';
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import logo from '../../image/republique.jpg';
import ico from '../../image/print.png';
import moment from "moment";

const PrintPVR = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Impression PVR',
        onAfterPrint: () => toast.success("Impression termine avec succee")
    });
    const date = new Date();

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
                    <h6>Objet: </h6>
                    <h6>Lieu : </h6>
                    <h6>Date : </h6>
                    <h6>Participants</h6>

                </div>
                <div className="content3">
                    <p>
                        Ce 14 Juillet 2022 , une quarantaine (40) de personnes ont répondu à l’invitation du Ministère de L’Enseignement Technique et de la Formation Professionnelle (METFP) pour une Réunion concernant le PTA 2023. Madame le SG a ouvert la séance et Monsieur le Directeur du DPSSE  a annoncé l’ordre du jour qui se divise en trois (3) parties : <br />
                        <div className="partie" style={{ marginLeft: '2cm', marginTop: '0.2cm', marginBottom: '1cm' }}>
                            	Préparation planification 2023 du Ministère <br />
                            	Savoir préparer un PTA initial <br />
                            	Repartir les groupes de travail <br />
                        </div>
                        Lors de la réunion, la feuille de route de PTA est énoncé et  repartit comme suit : <br />
                        <div className="deroule" style={{ marginLeft: '2cm', marginTop: '0.2cm', marginBottom: '1cm' }}>

                            	14 au 20 Juillet 2022 : Travail par Direction  et consolidation par Direction Général ( Programme Administration et coordination ) <br />
                            	21 au 23 Juillet 2022 : Insertion et compilation des activités <br />
                            	23-31 Juillet 2022 : Budgétisation et programmation <br />
                            	01 au 13 Août 2022 : Consolidation et transmission <br />
                        </div>
                        Pour faciliter la tâche de chaque direction on a répartissez  les directions du Ministère en 3 groupe: <br />
                        <div className="tache" style={{ marginLeft: '2cm', marginTop: '0.2cm' }}>

                            	Groupe 1: Direction transversales (SG, CGPP , DAF, DIDN DRH, PRMP) <br />
                            	Groupe 2: DGIF <br />
                            	Groupe 3 : DGEFT <br />
                        </div>
                        Il a été convenue chaque groupe doit travailler en équipe avec le PRMP et un personnel du PDPSSE .
                    </p>
                </div>
            </div>


        </>
    );
}

export default PrintPVR;