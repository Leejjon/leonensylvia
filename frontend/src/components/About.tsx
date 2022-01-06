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
        maxWidth: "90%",
        marginTop: "0.5em",
        marginBottom: "1em",
    },
});

const About: React.FC = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <Grid item>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="body2" fontSize="large" color="#001E3C" fontFamily="Times New Roman"
                                fontWeight="bold">{t("ABOUT")}</Typography>
                    <Divider/><br/>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("ABOUT_FIRST_MET")}</Typography>
                    <img className={classes.picture} src={require('../images/howwemet.png')}/>
                    <br/>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("ABOUT_HOUSE")}</Typography>
                    <img className={classes.picture} src={require('../images/renovation.png')}/>
                    <br/>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("ABOUT_PROPOSAL")}</Typography>
                    <img className={classes.picture} src={require('../images/proposal.png')}/>
                    <br />
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("ABOUT_CAT")}</Typography>
                    <img className={classes.picture} src={require('../images/felix.png')}/>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default About;
