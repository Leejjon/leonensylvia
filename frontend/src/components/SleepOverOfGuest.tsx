import attendanceState, {Guest} from "../state/AttendanceState";
import React, {useState} from "react";
import {Checkbox, ListItemButton, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";


export interface SleepOverOfGuestProps {
    guest: Guest,
    index: number,
}

const useStyles = makeStyles({
    checkboxLabel: {
        fontFamily: "Roboto"
    }
});

const SleepOverOfGuest: React.FC<SleepOverOfGuestProps> = ({guest, index}) => {
    const classes = useStyles();
    const [sleepOver, setSleepOver] = useState(attendanceState.guests[index].sleepingOver);
    const handleToggle = () => () => {
        attendanceState.guests[index].sleepingOver = !sleepOver;
        setSleepOver(!sleepOver);
    };
    return (
        <ListItemButton sx={{paddingTop: "0px", paddingBottom: "0px"}} onClick={handleToggle()} dense>
            <Checkbox
                className={classes.checkboxLabel}
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
