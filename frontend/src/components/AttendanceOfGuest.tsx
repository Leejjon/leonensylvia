import attendanceState, {Guest} from "../state/AttendanceState";
import {Checkbox, ListItemButton, Typography} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";

export interface AttendanceOfGuestProps {
    guest: Guest
    index: number,
}

const AttendanceOfGuest: React.FC<AttendanceOfGuestProps> = ({guest, index}) => {
    const [attending, setAttending] = useState(guest.attending);
    const handleToggle = () => () => {
        attendanceState.guests[index].attending = !attending;
        setAttending(!attending);
    };

    return (
        <ListItemButton sx={{paddingTop: "0px", paddingBottom: "0px"}} onClick={handleToggle()} dense>
            <Checkbox
                edge="start"
                checked={attending }
                tabIndex={-1}
                disableRipple
                inputProps={{'aria-labelledby': 'hoi'}}
                sx={{paddingTop: '0.2em'}}
            />
            <Typography variant="body2" fontSize="medium" sx={{paddingTop: '0px'}}>{guest.name}</Typography>
        </ListItemButton>
    );
};

export default AttendanceOfGuest;
