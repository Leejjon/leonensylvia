import React, {useEffect, useState} from 'react';
import './App.css';
import LoginView from "./views/LoginView";

import AttendanceView from "./views/AttendanceView";

const App: React.FC = () => {
    const [code, setCode] = useState<string | undefined>(undefined);
    const [formCompleted, setFormCompleted] = useState(false);

    useEffect(() => {
        let codeFromLocalStorage = localStorage.getItem("invitation");
        if (codeFromLocalStorage) {
            setCode(codeFromLocalStorage);
        }
    }, []);

    const setCodeInLocalStorage = (verifiedCodeFromApi: string, formAlreadyCompleted: boolean) => {
        localStorage.setItem("invitation", verifiedCodeFromApi);
        setCode(verifiedCodeFromApi);
        setFormCompleted(formAlreadyCompleted);
    }

    if (code) {
        return (
            <AttendanceView code={code} formCompleted={formCompleted} setFormCompleted={setFormCompleted}/>
        );
    } else {
        return (
            <LoginView storeInvitationCode={setCodeInLocalStorage}/>
        );
    }
}

export default App;
