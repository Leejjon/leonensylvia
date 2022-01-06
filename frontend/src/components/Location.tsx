import {makeStyles} from "@mui/styles";
import React from "react";
import {useTranslation} from "react-i18next";
import {Card, CardContent, Divider, Grid, Typography} from "@mui/material";


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

const Location: React.FC = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <Grid item>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="body2" fontSize="large"  color="#001E3C" fontFamily="Times New Roman"
                                fontWeight="bold">{t('LOCATION')}</Typography>
                    <Divider/><br/>
                    <img alt="Kasteel Assumburg" className={classes.castle} src={require('../images/assemburg.png')}/>
                    <br />
                    <br />
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman" fontWeight="bold">{t("ADDRESS")}</Typography>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">Slot Assumburg</Typography>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">Tolweg 9, 1967 NG Heemskerk</Typography><br />
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">Website: <a target="new" href="https://www.stayokay.com/en/hostel/heemskerk">https://www.stayokay.com/en/hostel/heemskerk</a></Typography>
                    <br />
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman" fontWeight="bold">{t("PUBLIC_TRANSPORT_TITLE")}:</Typography>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("PUBLIC_TRANSPORT_DESCRIPTION")}</Typography>
                    <br />
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman" fontWeight="bold">{t("BY_CAR")}:</Typography>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("BY_CAR_ROUTE")}</Typography>
                    <br />
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("PARKING")}</Typography><br/>

                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman" fontWeight="bold">Taxi</Typography>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("TAXI")} <a href="https://taxikennemerland.nl/" target="new">https://taxikennemerland.nl/</a></Typography>
                    <br />
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("TAXI_RATE")}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Location;
