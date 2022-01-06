import {makeStyles} from "@mui/styles";
import React from "react";
import {useTranslation} from "react-i18next";
import {Card, CardContent, Divider, Grid, Typography} from "@mui/material";
import attendanceState from "../state/AttendanceState";


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        textAlign: 'center',
    },
    card: {
        minWidth: "20em",
        maxWidth: "20em",
        textAlign: "left",
        backgroundImage: `url(${require('../images/loveshoot-lr-044-3.png')})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom'
    },
    castle: {
        maxWidth: "100%",
    }
});

const Overnachten: React.FC = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <Grid item>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="body2" fontSize="large" color="#001E3C" fontFamily="Times New Roman"
                                fontWeight="bold">Hotel</Typography>
                    <Divider/><br/>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman" fontWeight="bold">{attendanceState.guests[0].sleepingOver ? t("STAYING_FOR_INVITED") : t("STAYING_FOR_UNINVITED")}</Typography>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{attendanceState.guests[0].sleepingOver ? t("STAYING_FOR_INVITED_DESCRIPTION") : t("STAYING_FOR_UNINVITED_DESCRIPTION")}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Overnachten;
