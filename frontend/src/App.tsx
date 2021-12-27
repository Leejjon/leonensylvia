import React, {useEffect, useState} from 'react';
import './App.css';
import Login from "./components/Login";

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
            <div>Hello</div>
        );
    } else {
        return (
            <Login storeInvitationCode={setCodeInLocalStorage}/>
        );
    }
}

export default App;
