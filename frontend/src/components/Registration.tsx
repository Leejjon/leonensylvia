import React from "react";
import {useTranslation} from "react-i18next";
import {Button, Card, CardContent, Divider, Grid, Typography} from "@mui/material";
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

export interface RegistrationProps {
    undoRegistration: () => void;
}

const Registration: React.FC<RegistrationProps> = ({undoRegistration}) => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <Grid item>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="body2" fontSize="large"  color="#001E3C" fontFamily="Times New Roman"
                                fontWeight="bold">{t("YOUR_ATTENDANCE")}</Typography>
                    <Divider/><br/>
                    <Typography variant="body2" fontSize="medium"  color="#001E3C" fontFamily="Times New Roman">
                        {t("ALREADY_REGISTERED")}
                    </Typography><br/>
                    <Button
                        sx={{
                            textTransform: "none",
                            marginTop: "0.5em",
                            marginBottom: "1.5em",
                            width: "80%",
                            marginRight: "20%"
                        }}
                        variant="contained" onClick={undoRegistration}>{t("REDO_REGISTRATION")}</Button>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Registration;
