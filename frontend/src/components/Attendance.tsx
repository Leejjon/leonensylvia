import React from "react";
import {Button} from "@mui/material";


const Attendance: React.FC = () => {
    return (
        <div>Hello <Button onClick={() => { localStorage.clear() }}>Reset local storage</Button></div>
    );
};

export default Attendance;
