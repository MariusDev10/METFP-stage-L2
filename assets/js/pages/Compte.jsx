
import React, { useState } from "react";
import '../../styles/app.css';
import logo from '../../image/republique.jpg';
import logo1 from '../../image/logo.png';
import { Link } from "react-router-dom";
import { async } from "regenerator-runtime";
import { toast } from "react-toastify";
import Axios from "axios";
const Compte = ({ history }) => {

    const [user, setUser] = useState({
        nom: "",
        prenom: "",
        email: "",
        fonction: "",
        password: "",
        passwordComfirm: ""
    });

    const [errors, setErrors] = useState("");
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const response = await Axios.post("http://127.0.0.1:8000/api/missionnaires", user);
            console.log(response);
            toast.success("Compte creer avec succés")
            history.replace("/login");

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

    return (
        <>
            <div className="container-fluid" id="user">
                <div className="row">
                    <div className="metfp col-sm-6">
                        <img src={logo} alt="" className="img-fluid" />
                    </div>
                    <div className="repub">
                        <div className="resister d-flex">
                            <img src={logo1} alt="" className="img-fluid" />
                            <h5>Creation du Compte</h5>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="">Nom</label>
                                <input
                                    value={user.nom}
                                    onChange={handleChange}
                                    name="nom"
                                    error={errors.nom}
                                    type="text"
                                    className="form-control"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Prenom</label>
                                <input
                                    value={user.prenom}
                                    error={errors.prenom}
                                    onChange={handleChange}
                                    type="text"
                                    name="prenom"
                                    className="form-control"
                                    placeholder="Votre Prenom"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Votre Poste (fonction)</label>
                                <input
                                    type="text"
                                    name="fonction"
                                    className="form-control"
                                    placeholder="Poste chez METFP"
                                    error={errors.fonction}
                                    value={user.fonction}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Adresse E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email"
                                    error={errors.email}
                                    required
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Votre mot de passe</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Mot de passe"
                                    error={errors.password}
                                    required
                                    value={user.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Comfirmer votre  mot de passe</label>
                                <input
                                    type="password"
                                    name="passwordComfirm"
                                    className="form-control"
                                    placeholder=" comfirmation Mot de passe"
                                    error={errors.passwordComfirm}
                                    value={user.passwordComfirm}
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="valid text-center mt-6">
                                <button type="submit" className="btn btn-primary mr-4">S'inscrire</button>
                                <Link to="/login" className="btn btn-link">J'ai deja un compte</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Compte;