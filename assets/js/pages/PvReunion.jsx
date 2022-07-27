import React, { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import '../../styles/app.css';
import { toast } from "react-toastify";
import Field from "../components/Forms/Field";
import logo from '../../image/logo.png';
import { Editor } from "@tinymce/tinymce-react";
const PvReunion = props => {
    const [missions, setMissions] = useState({
        date: "",
        destination: "",
        objectif: "",
        contexte: "",
        solution: ""
    });
    const handleChange = (Event) => {
        const value = Event.currentTarget.value;
        const name = Event.currentTarget.name;
        setMissions({ ...missions, [name]: value });
    }
    const editorRef = useRef();
    const handler = (e, editor) => {
        alert(editorRef.current.getContent());
    }

    return (
        <>
            <div className="container-fluid" id="pv" style={{ marginTop: '0.5cm' }}>
                <div className="titre text-center">
                    <img src={logo} alt="" style={{ width: '1.5cm', position: 'absolute', marginLeft: '-5cm', marginTop: '-0.4cm' }} />
                    <h4>PV REUNION METFP</h4>
                </div>
                <div className="container-fluid" id="formulaire">
                    <form action="">
                        <div className="row">
                            <div className="rap3">
                                <div className="left2">
                                    <h5 className="mb-5">EN TETE</h5>
                                    <Field label="Objet" value={missions.destination} onChange={handleChange} name="destination" />
                                    <Field label='Date' value={missions.date} onChange={handleChange} type="date" name="date" />
                                    <Field label="Lieu" className="form-control" value={missions.objectif} onChange={handleChange} placeholder="Objectif" name="objectif" />
                                    <Field label="Participants" value={missions.contexte} onChange={handleChange} name="contexte" type="text" />
                                    <button className="btn btn-danger" style={{ width: '100%' }}>Enregistrer</button>
                                </div>
                                <div className="right2">
                                    <p>CONTENUE</p>
                                    <Editor
                                        onInit={(evt, editor) => editorRef.current = editor}
                                    />
                                    <button className="btn btn-success btn-sm mt-3" onClick={handler}>Voir le resultat</button>
                                </div>


                            </div>

                        </div>
                    </form>
                </div>

            </div>
        </>
    );
}
export default PvReunion;