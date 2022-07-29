import React, { useEffect, useRef, useState } from "react";
import '../../styles/app.css';
import Axios from "axios";
import Field from "../components/Forms/Field";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";

/**IMPORTATION DES IMAGES */
import logo from '../../image/logo.png';
const PvReunion = props => {
    const [editing, setEditing] = useState(false);
    const { idN = "new" } = props.match.params;
    /**ajout d'une noouvelle PV REUNION */
    const [reunions, setReunions] = useState({
        date: "",
        lieu: "",
        objet: "",
        participants: ""
    });
    const handleChange = (Event) => {
        const value = Event.currentTarget.value;
        const name = Event.currentTarget.name;
        setReunions({ ...reunions, [name]: value });
    }

    const fetchReunion = async idN => {
        try {
            const data = await Axios
                .get("http://127.0.0.1:8000/api/reunions/" + idN)
                .then(Response => Response.data);
            const { date, participants, lieu, objet } = data;
            setReunions({ date, participants, lieu, objet });
        } catch (error) {
            console.log(error.Response);
        }
    }
    useEffect(() => {
        if (idN != 'new') {
            setEditing(true);
            fetchReunion(idN);
        }
    }, [idN]);
    const handleSubmit = async event => {
        event.preventDefault();
        if (editing) {
            const response = await Axios.put("http://127.0.0.1:8000/api/reunions" + idN, reunions);
        } else {
            try {
                const response = await Axios.post("http://127.0.0.1:8000/api/reunions", reunions);
            } catch (error) {
                console.log(error.response);
                const { violation } = error.response.data;
                if (violation) {
                    const apiError = {};
                    violation.forEach(violation => {
                        apiError[violation.propertyPath] = violation.message
                    });
                    setErrors(apiError);
                }
                toast.error("Une erreur est survenue , veiller ressayer ")
            }
        }
    }
    /**GET TINYMCE CONTENT */
    const editorRef = useRef();
    return (
        <>
            <div className="container-fluid" id="pv" style={{ marginTop: '0.5cm' }}>
                <div className="titre text-center">
                    <img src={logo} alt="" style={{ width: '1.5cm', position: 'absolute', marginLeft: '-8cm', marginTop: '-0.4cm' }} />
                    {!editing && <h4>CREATION DE PV REUNION METFP</h4> || <h4>MODIFICATION DE PV REUNION METFP</h4>}
                </div>
                <div className="container-fluid" id="formulaire">
                    <form action="">
                        <div className="row">
                            <div className="rap3">
                                <div className="left2">
                                    <h5 className="mb-5">EN TETE</h5>
                                    <Field label="Objet" value={reunions.objet} onChange={handleChange} name="objet" />
                                    <Field label='Date' value={reunions.date} onChange={handleChange} type="date" name="date" />
                                    <Field label="Lieu" className="form-control" value={reunions.lieu} onChange={handleChange} placeholder="Objectif" name="lieu" />
                                    <Field label="Participants" value={reunions.participants} onChange={handleChange} name="participants" type="text" />

                                </div>
                                <div className="right2">
                                    <p>CONTENU</p>
                                    <Editor onInit={(evt, editor) => editorRef.current} />
                                    <button className="btn btn-danger" style={{ width: '100%', marginTop: '0.5cm' }} onSubmit={handleSubmit}>Enregistrer</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <footer style={{ height: '1.5cm', backgroundColor: ' #20bcaf', marginTop: '1.3cm', textAlign: 'center' }}>
                <p style={{ fontSize: '0.7em', color: 'white', paddingTop: '0.5cm' }}>Ministere de l'enseignement Technique et de Formation Professionnelle Copyright 2022</p>
            </footer>
        </>
    );
}
export default PvReunion;