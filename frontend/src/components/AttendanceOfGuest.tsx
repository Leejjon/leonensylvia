import {Guest} from "../state/AttendanceState";
import {Checkbox, ListItemButton, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
    root: {
        flexShrink: 0,
        textAlign: 'center',
        marginTop: '1em',
    },
    card: {
        minWidth: "20em",
        maxWidth: "20em"
    },

});

export interface AttendanceOfGuestProps {
    guest: Guest
}

const AttendanceOfGuest: React.FC<AttendanceOfGuestProps> = ({guest}) => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);

    const handleToggle = () => () => {
        console.log(checked);

        setChecked(!checked);
    };

    return (
        <ListItemButton sx={{paddingTop: "0px", paddingBottom: "0px"}} onClick={handleToggle()} dense>
            <Checkbox
                edge="start"
                checked={checked}
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
