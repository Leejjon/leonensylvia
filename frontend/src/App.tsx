import React, {useEffect, useState} from 'react';
import './App.css';
import Login from "./components/Login";
import {Button} from "@mui/material";
import Attendance from "./components/Attendance";

const App: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        let code = localStorage.getItem("invitation");
        if (code) {
            setLoggedIn(true);
        }
    }, []);

    const setCodeInLocalStorage = (code: string) => {
        localStorage.setItem("invitation", code);
        setLoggedIn(true);
    }

    if (loggedIn) {
        return (
            <Attendance/>
        );
    } else {
        return (
            <Login storeInvitationCode={setCodeInLocalStorage}/>
        );
    }
}

export default App;
