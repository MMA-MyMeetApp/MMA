import { useState } from "react";
import RegistrationForm from "./RegistrationForm.js";

function LoginForm() {
    const [isRgClick, setIsRgClick] = useState(false);

    const handleRegisterClick = (event) => {
        event.preventDefault();
        setIsRgClick(true);
    };

    if (isRgClick) {
        return <RegistrationForm />;
    }

    return (
        <div>
            <div className="border border-primary rounded col-2 offset-5 m-auto mt-3 mb-3 bg-primary text-white">
                <h1><u>Přihlášení</u></h1>
                <form className="m-3">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control text-center-placeholder"
                            id="myInput"
                            name="email"
                            placeholder="petr.novak@gamil.com"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Heslo</label>
                        <input
                            type="password"
                            className="form-control text-center-placeholder"
                            id="myInput"
                            name="password"
                            placeholder="**********"
                        />
                    </div>
                    <button type="submit" className="btn btn-light m-1">Přihlásit se</button>
                </form>
                <a href="#" onClick={handleRegisterClick} className="text-white">Registrace</a>
            </div>
        </div>
    );
}

export default LoginForm;