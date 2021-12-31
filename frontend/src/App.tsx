import React, {useEffect, useState} from 'react';
import './App.css';
import LoginView from "./views/LoginView";

import AttendanceView from "./views/AttendanceView";

const App: React.FC = () => {
    const [code, setCode] = useState<string | undefined>(undefined);

    useEffect(() => {
        let codeFromLocalStorage = localStorage.getItem("invitation");
        if (codeFromLocalStorage) {
            setCode(codeFromLocalStorage);
        }
    }, []);

    const setCodeInLocalStorage = (verifiedCodeFromApi: string) => {
        localStorage.setItem("invitation", verifiedCodeFromApi);
        setCode(verifiedCodeFromApi);
    }

    if (code) {
        return (
            <AttendanceView code={code}/>
        );
    } else {
        return (
            <LoginView storeInvitationCode={setCodeInLocalStorage}/>
        );
    }
}

export default App;
