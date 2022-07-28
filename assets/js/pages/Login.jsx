import React, { useState } from "react";
import '../../styles/app.css';
import authAPI from "../services/authAPI";
import { toast } from "react-toastify";

/**importation des images */
import logo from '../../image/republique.jpg';
import login from '../../image/connect.svg';

const Login = ({ onLogin, history }) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");
    const handleChange = (Event) => {
        const value = Event.currentTarget.value;
        const name = Event.currentTarget.name;

        setCredentials({ ...credentials, [name]: value });
    }

    const handleSubmit = async Event => {
        Event.preventDefault();
        try {
            await authAPI.authenticate(credentials);
            setError("");
            onLogin(true);
            toast.success("Vous etes bien connecte")
            history.replace("/home");
        } catch (error) {
            setError("Aucun compte correspond a cette information . Veiller ressayer ");
            toast.error("Une erreur est survenue veiller ressayer")
        }
    }

    return (
        <>

            <div className="container" id="login">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <h4>Connexion</h4>
                        <div className="form-floating mb-3">
                            <input
                                value={credentials.username}
                                onChange={handleChange}
                                name="username"
                                type="email"
                                className={"form-control" + (error && " is-invalid")}
                                id="username"
                                placeholder="name@example.com"
                            />
                            <label>Email</label>

                        </div>

                        <div className="form-floating">
                            <input
                                value={credentials.password}
                                name="password"
                                onChange={handleChange}
                                type="password"
                                className={"form-control" + (error && " is-invalid")}
                                id="password"
                                placeholder="Password"
                            />
                            <label>Mot de passe</label>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-success" type="submit"><i><img src={login} alt="" /> </i>  Seconnecter</button>
                        </div>
                        <a href="#"><span>Mot de passe oublié ?</span></a>
                    </div>
                </form>
                <div className="logo2">
                    <h4>RAPPORT DE MISSION</h4>
                    <img src={logo} className="img-fluid" /><br />
                </div>

            </div>
            <footer style={{ height: '1.5cm', backgroundColor: ' #20bcaf', marginTop: '1.3cm', textAlign: 'center' }}>
                <p style={{ fontSize: '0.7em', color: 'white', paddingTop: '0.5cm' }}>Ministere de l'enseignement Technique et de Formation Professionnelle Copyright 2022</p>
            </footer>

        </>
    );
}
export default Login;