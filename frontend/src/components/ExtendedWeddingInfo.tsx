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
        fontFamily: "Times New Roman",
        minWidth: "20em",
        maxWidth: "20em",
        textAlign: "left",
        backgroundImage: `url(${require('../images/loveshoot-lr-044-3.png')})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom'
    },
});

const ExtendedWeddingInfo: React.FC = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <Grid item>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="body2" fontSize="large" color="#001E3C" fontFamily="Times New Roman"
                                fontWeight="bold">{t("PROGRAM")}</Typography>
                    <Divider/>
                    <br />
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("DATE")}</Typography>
                    <br/>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman" fontWeight="bold">{t("SATURDAY")}</Typography>
                    {attendanceState.guests[0].fromCeremony &&
                        <>
                            <Typography variant="body2" fontSize="medium"  fontFamily="Times New Roman">{t("CEREMONY_DESCRIPTION_EXTENDED")}</Typography>
                            <Typography variant="body2" fontSize="medium"  fontFamily="Times New Roman">{t("CEREMONY_BRIDAL")}</Typography>
                            <Typography variant="body2" fontSize="medium"  fontFamily="Times New Roman">{t("CEREMONY_START")}</Typography>
                            <Typography variant="body2" fontSize="medium"  fontFamily="Times New Roman">{t("GROUP_PICTURE")}</Typography>
                        </>
                    }
                    {!attendanceState.guests[0].fromCeremony &&
                        <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">
                            {t("DRINKS_DESCRIPTION_LATE")}
                        </Typography>
                    }
                    {attendanceState.guests[0].sleepingOver &&
                        <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">
                            {t("DRINKS_DESCRIPTION_EXTENDED")}
                        </Typography>
                    }
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("DINNER_DESCRIPTION")}</Typography>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("PARTY_DESCRIPTION")}</Typography>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">
                        {attendanceState.guests[0].allowedToSleepOver ? t("PARTY_END_DELUXE") : t("PARTY_END")}
                    </Typography>
                    {attendanceState.guests[0].allowedToSleepOver &&
                        <>
                            <br/>
                            <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman" fontWeight="bold">{t("SUNDAY")}</Typography>
                            <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("BREAKFAST")}</Typography>
                            <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("CHECK_OUT")}</Typography>
                        </>
                    }
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ExtendedWeddingInfo;
