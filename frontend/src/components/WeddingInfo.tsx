import React from "react";
import {Card, CardContent, Divider, Grid, Typography} from "@mui/material";
import attendanceState from "../state/AttendanceState";
import {makeStyles} from "@mui/styles";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        textAlign: 'center',
    },
    card: {
        minWidth: "20em",
        maxWidth: "20em",
        textAlign: "left"
    },
});

const WeddingInfo: React.FC = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <Grid item>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="body2" fontSize="medium"
                                fontWeight="bold">{t("WEDDING_INFO_TITLE")}</Typography>
                    <Divider/><br/>
                    <Typography variant="body2" fontSize="medium">{t("WELCOME_MESSAGE")}</Typography>
                    <br/>
                    <Typography variant="body2" fontSize="medium">{t("WE_HOPE_YOU_CAN_EVENT")}</Typography>
                    <br/>
                    {attendanceState.guests[0].fromCeremony &&
                        <Typography variant="body2" fontSize="medium">{t("CEREMONY_DESCRIPTION")}</Typography>
                    }
                    <Typography variant="body2" fontSize="medium">{t("DRINKS_DESCRIPTION")}</Typography>
                    <Typography variant="body2" fontSize="medium">{t("DINNER_DESCRIPTION")}</Typography>
                    <Typography variant="body2" fontSize="medium">{t("PARTY_DESCRIPTION")}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default WeddingInfo;
