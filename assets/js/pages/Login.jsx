import Axios from "axios";
import React, { useState } from "react";
import '../../styles/app.css';

const Login = (props) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const handleChange = (Event) => {
        const value = Event.currentTarget.value;
        const name = Event.currentTarget.name;

        setCredentials({ ...credentials, [name]: value });
    }

    const handleSubmit = Event => {
        Event.preventDefault();
        try {
            Axios
                .post("", credentials)
                .then(response => console.log(response));
        } catch (error) {
            console.log(error.response);
        }
    }
    return (
        <>
            <div className="container" id="login">

                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <h3>Connexion</h3>
                        <div class="form-floating mb-3">
                            <input
                                value={credentials.username}
                                onChange={handleChange}
                                name="username"
                                type="email"
                                className="form-control"
                                id="username"
                                placeholder="name@example.com"
                            />
                            <label for="floatingInput">Adresse E-mail</label>
                        </div>
                        <div className="form-floating">
                            <input
                                value={credentials.password}
                                name="password"
                                onChange={handleChange}
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                            />
                            <label for="floatingPassword">Mot de passe</label>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success" type="submit">Seconnecter</button>
                        </div>
                    </div>
                </form>

            </div>

        </>
    );
}
export default Login;