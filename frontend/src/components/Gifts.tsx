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
    picture: {
        maxWidth: "60%",
        marginTop: "0.5em",
        marginBottom: "0.5em",
    },
    smallpicture: {
        margin: "0.5em",
        maxWidth: "20%",
    }
});

const Gifts: React.FC = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <Grid item>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="body2" fontSize="large" color="#001E3C" fontFamily="Times New Roman"
                                fontWeight="bold">{t("GIFT_TITLE")}
                    </Typography>
                    <Divider/><br/>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman" fontWeight="bold">{t("GIFT_DESCRIPTION1")}</Typography>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("GIFT_DESCRIPTION1_EXTENDED")}<u>rb.altingvangeusau@gmail.com</u></Typography>
                    <br/>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman" fontWeight="bold">{t("GIFT_WE_DISLIKE")}</Typography>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("GIFT_WE_DISLIKE_EXTENDED")}</Typography>
                    <br/>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman" fontWeight="bold">{t("GIFT_DESCRIPTION2")}</Typography>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("GIFT_DESCRIPTION3")}</Typography>
                    <a href="https://www.podiumcadeaukaart.nl/" target="new">
                        <img alt="Podium cadeaukaart" className={classes.picture} src={require('../images/podiumkaart.jpeg')}/>
                    </a>
                    <br />
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("GIFT_DESCRIPTION4")}</Typography>
                    <br/>
                    <a href="https://www.deboet.nl/boet-kado-kaart" target="new">
                        <img alt="Tuin-,sfeer- & kluscentrum de boet" className={classes.picture} src={require('../images/deboet.jpeg')}/>
                    </a><br/>
                    <a href="https://www.ranzijn.nl/ranzijn-services/klantenservice/tuinbon" target="new">
                        <img alt="Ranzijn tuinbon" className={classes.smallpicture} src={require('../images/ranzijn.jpeg')}/>
                    </a>
                    <a href="https://www.intratuin.nl/cadeaukaart"  target="new">
                        <img alt="Intratuin cadeaubon" className={classes.smallpicture} src={require('../images/intratuin.png')}/>
                    </a>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Gifts;
