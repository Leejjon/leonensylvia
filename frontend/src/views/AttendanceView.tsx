import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardContent,
    CircularProgress, Divider, Grid,
    List,
    ListItem,
    TextField,
    Typography
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import attendanceState from "../state/AttendanceState";
import {getHost} from "../service/Network";
import AttendanceOfGuest from "../components/AttendanceOfGuest";
import {useTranslation} from "react-i18next";
import SleepOverQuestion from "../components/SleepOverQuestion";

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
    progress: {
        margin: '8em',
    },
});

export interface AttendanceProps {
    code: string
}

const AttendanceView: React.FC<AttendanceProps> = ({code}) => {
    const classes = useStyles();
    const {t} = useTranslation();
    const [loading, setLoading] = useState(true);
    const [invalidMessage, setInvalidMessage] = useState<string | undefined>(undefined);


    useEffect(() => {
        if (attendanceState.guests.length > 0) {
            setLoading(false);
        } else {
            fetch(getHost() + "/api/invitation", {
                method: "GET", headers: {invitation: localStorage.getItem('invitation') as string}
            }).then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    setInvalidMessage("Did not receive valid ");
                }
            }).then((json) => {
                attendanceState.setGuests(json);
                setInvalidMessage(undefined);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                attendanceState.setGuests([]);
                setInvalidMessage("Couldn't verify if the code was valid.");
            });
        }
    }, []);

    if (loading) {
        return <div className={classes.root}><CircularProgress className={classes.progress}/></div>
    } else {
        if (attendanceState.guests.length > 0) {
            return (
                <Grid container justifyContent="center" spacing={2} className={classes.root}>
                    <Grid item xs={12} sx={{marginTop: "0.5em", marginBottom: "0em"}}>
                        <Typography variant="h1" sx={{fontFamily: "times new roman"}} fontSize="xxx-large">Leon &
                        Sylvia</Typography>
                    </Grid>
                    <Grid item>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="body2" fontSize="medium" fontWeight="bold">{t("WEDDING_INFO_TITLE")}</Typography>
                                <Divider/><br />
                                <Typography variant="body2" fontSize="medium">{t("WELCOME_MESSAGE")}</Typography>
                                <br />
                                <Typography variant="body2" fontSize="medium">{t("WE_HOPE_YOU_CAN_EVENT")}</Typography>
                                <br />
                                <Typography variant="body2" fontSize="medium">{t("CEREMONY_DESCRIPTION")}</Typography>
                                <Typography variant="body2" fontSize="medium">{t("DRINKS_DESCRIPTION")}</Typography>
                                <Typography variant="body2" fontSize="medium">{t("DINNER_DESCRIPTION")}</Typography>
                                <Typography variant="body2" fontSize="medium">{t("PARTY_DESCRIPTION")}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="body2" fontSize="medium" fontWeight="bold">{t("YOUR_ATTENDANCE")}</Typography>
                                <Divider/><br />
                                <Typography variant="body2" fontSize="medium">{t("ATTEND_MESSAGE")}</Typography>
                                <List>
                                    {attendanceState.guests.map((guest) => {
                                        return <ListItem sx={{paddingLeft: "0px", paddingTop: "0px", paddingBottom: "0px"}} key={`tableRow${guest.name}`}><AttendanceOfGuest guest={guest}/></ListItem>;
                                    })}
                                </List>
                                {attendanceState.guests[0].allowedToSleepOver &&
                                    <SleepOverQuestion />
                                }
                                <br/>
                                <Typography variant="body2" fontSize="medium">{t("EMAIL_DESCRIPTION")}</Typography>
                                <TextField
                                    id="outlined-static"
                                    multiline
                                    label={t("EMAIL_HERE")}
                                    InputLabelProps={{shrink: false}}
                                    rows={1}
                                    defaultValue={""}
                                    hiddenLabel
                                    sx={{marginTop: "0.8em", marginBottom: "1.5em"}}
                                />
                                <br />
                                <Typography variant="body2" fontSize="medium">{t("DIET_DESCRIPTION")}</Typography>
                                <TextField
                                    id="outlined-static"
                                    multiline
                                    label={"Allergies"}
                                    rows={1}
                                    defaultValue={""}
                                    sx={{marginTop: "0.8em", marginBottom: "0.8em"}}
                                />
                                <br />
                                <br />
                                <Typography variant="body2" fontSize="medium">{t("REMARKS")}</Typography>
                                <TextField
                                    id="outlined-static"
                                    multiline
                                    InputLabelProps={{shrink: false}}
                                    rows={1}
                                    defaultValue={""}
                                    label={"Remarks"}
                                    sx={{marginTop: "0.8em", marginBottom: "0.8em"}}
                                />
                                <Button sx={{textTransform: "none", marginTop: "0.5em", width: "50%", marginRight: "50%"}} variant="contained">{t("REGISTER_BUTTON")}</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            );
        } else {
            return <div className={classes.root}>{invalidMessage}</div>;
        }
    }
};

export default AttendanceView;
