import React, {useContext} from "react";
import Title from "../title/Title";
import {UserContext} from "../../contexts/UserContext";
import "./Header.css";

export default function Header({name}) {
    const {user, setUser} = useContext(UserContext);
    return (<header className="header">
            <Title name={name}/>
            {user && <button onClick={() => setUser(null)}>Cerrar sesión</button>}
        </header>
    );
}