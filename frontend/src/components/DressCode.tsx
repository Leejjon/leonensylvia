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
        // backgroundImage: `url(${require('../images/loveshoot-lr-044-3.png')})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom'
    },
    castle: {
        maxWidth: "100%",
    }
});

const DressCode: React.FC = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <Grid item>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="body2" fontSize="large" color="#001E3C" fontFamily="Times New Roman"
                                fontWeight="bold">{t("DRESS_CODE_TITLE")}
                    </Typography>
                    <Divider/><br/>
                    <Typography variant="body2" fontSize="medium" color="#001E3C" fontFamily="Times New Roman">{t("DRESS_CODE")}</Typography>

                </CardContent>
            </Card>
        </Grid>
    );
};

export default DressCode;
