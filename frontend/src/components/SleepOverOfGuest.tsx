import attendanceState, {Guest} from "../state/AttendanceState";
import React, {useState} from "react";
import {Checkbox, ListItemButton, Typography} from "@mui/material";


export interface SleepOverOfGuestProps {
    guest: Guest,
    index: number,
}

const SleepOverOfGuest: React.FC<SleepOverOfGuestProps> = ({guest, index}) => {
    const [sleepOver, setSleepOver] = useState(false);
    const handleToggle = () => () => {
        attendanceState.guests[index].sleepingOver = !sleepOver;
        setSleepOver(!sleepOver);
    };
    return (
        <ListItemButton sx={{paddingTop: "0px", paddingBottom: "0px"}} onClick={handleToggle()} dense>
            <Checkbox
                edge="start"
                checked={sleepOver}
                tabIndex={-1}
                disableRipple
                inputProps={{'aria-labelledby': 'hoi'}}
                sx={{paddingTop: '0.2em'}}
            />
            <Typography variant="body2" fontSize="medium" sx={{paddingTop: '0px'}}>{guest.name}</Typography>
        </ListItemButton>
    );
};

export default SleepOverOfGuest;
