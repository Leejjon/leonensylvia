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
        fontFamily: "Times New Roman",
        minWidth: "20em",
        maxWidth: "20em",
        textAlign: "left",
        backgroundImage: `url(${require('../images/loveshoot-lr-044-3.png')})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom'
    },
});

const WeddingInfo: React.FC = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <Grid item>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="body2" fontSize="medium" color="#001E3C" fontFamily="Times New Roman"
                                fontWeight="bold">{t("WEDDING_INFO_TITLE")}</Typography>
                    <Divider/><br/>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("WELCOME_MESSAGE")}</Typography>
                    <br/>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("WE_HOPE_YOU_CAN_EVENT")}</Typography>
                    <br />
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("THE_PROGRAM_IS_AS_FOLLOWS")}</Typography>
                    <br/>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman" fontWeight="bold">{t("SATURDAY")}</Typography>
                    {attendanceState.guests[0].fromCeremony &&
                        <Typography variant="body2" fontSize="medium"  fontFamily="Times New Roman" fontWeight="bold">{t("CEREMONY_DESCRIPTION")}</Typography>
                    }
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman" fontWeight="bold">{t("DRINKS_DESCRIPTION")}</Typography>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman" fontWeight="bold">{t("DINNER_DESCRIPTION")}</Typography>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman" fontWeight="bold">{t("PARTY_DESCRIPTION")}</Typography>
                    {attendanceState.guests[0].allowedToSleepOver &&
                        <>
                            <br/>
                            <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman" fontWeight="bold">{t("SUNDAY")}</Typography>
                            <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman" fontWeight="bold">{t("BREAKFAST")}</Typography>
                        </>
                    }
                </CardContent>
            </Card>
        </Grid>
    );
}

export default WeddingInfo;
