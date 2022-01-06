import React from "react";
import {useTranslation} from "react-i18next";
import {Card, CardContent, Divider, Grid, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

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
});

const Covid: React.FC = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <Grid item>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="body2" fontSize="large"  color="#001E3C" fontFamily="Times New Roman"
                                fontWeight="bold">{t('COVID')}</Typography>
                    <Divider/><br/>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("COVID_DESCRIPTION")}</Typography>
                    <br />
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman" fontWeight="bold">{t("TEST_BEFORE_ATTENDING")}</Typography><br/>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("COVID_DESCRIPTION2")}</Typography>

                </CardContent>
            </Card>
        </Grid>
    );
};

export default Covid;
