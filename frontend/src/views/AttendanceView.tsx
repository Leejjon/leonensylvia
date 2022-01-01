import React, {ChangeEvent, useEffect, useState} from "react";
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
import SleepOverOfGuest from "../components/SleepOverOfGuest";

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
    const [invalidCodeMessage, setInvalidCodeMessage] = useState<string | undefined>(undefined);
    const [emailInvalidMessage, setEmailInalidMessage] = useState<string | undefined>(undefined);

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
                    setInvalidCodeMessage("Did not receive valid ");
                }
            }).then((json) => {
                if (json.length > 0) {
                    attendanceState.setGuests(json);
                    setInvalidCodeMessage(undefined);
                } else {
                    setInvalidCodeMessage("Invalid code");
                }
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                attendanceState.setGuests([]);
                setInvalidCodeMessage("Couldn't verify if the code was valid.");
            });
        }
    }, []);

    const validateEmail = (event: ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
        const email = event.target.value;
        // Source: https://stackoverflow.com/questions/46370725/how-to-do-email-validation-using-regular-expression-in-typescript
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (regexp.test(email)) {
            for (let i in attendanceState.guests) {
                attendanceState.guests[i].email = email;
            }
            setEmailInalidMessage(undefined);
        } else if (email === "") {
            setEmailInalidMessage(undefined);
        } else {
            setEmailInalidMessage("E-mail invalid");
        }
    };

    const saveRemarks = (event: ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
        const remarks = event.target.value;
        if (remarks) {
            for (let i in attendanceState.guests) {
                attendanceState.guests[i].remarks = remarks;
            }
        }
    }

    const handleRegistration = async () => {
        console.log('Register');
        console.log(attendanceState.guests);
    }

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
                    <Grid item>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="body2" fontSize="medium"
                                            fontWeight="bold">{t("YOUR_ATTENDANCE")}</Typography>
                                <Divider/><br/>
                                <Typography variant="body2" fontSize="medium">{t("ATTEND_MESSAGE")}</Typography>
                                <List sx={{marginBottom: "0.4em"}}>
                                    {attendanceState.guests.map((guest, index) => {
                                        return <ListItem
                                            sx={{paddingLeft: "0px", paddingTop: "0px", paddingBottom: "0px"}}
                                            key={`tableRow${guest.name}`}><AttendanceOfGuest guest={guest} index={index} /></ListItem>;
                                    })}
                                </List>
                                {attendanceState.guests[0].allowedToSleepOver &&
                                    <>
                                        <Typography variant="body2" fontSize="medium">{t("SLEEP_OVER")}</Typography>
                                        <List sx={{marginBottom: "0.4em"}}>
                                            {attendanceState.guests.map((guest, index) => {
                                                return (
                                                    <ListItem sx={{paddingLeft: "0px", paddingTop: "0px", paddingBottom: "0px"}} key={`tableRow${guest.name}`}>
                                                        <SleepOverOfGuest guest={guest} index={index}/>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </>
                                }
                                <Typography variant="body2" fontSize="medium">{t("EMAIL_DESCRIPTION")}</Typography>
                                <TextField
                                    error={emailInvalidMessage !== undefined}
                                    helperText={emailInvalidMessage !== undefined ? emailInvalidMessage : undefined}
                                    id="outlined-static"
                                    multiline
                                    label={t("EMAIL_HERE")}
                                    rows={1}
                                    defaultValue={""}
                                    hiddenLabel
                                    onChange={validateEmail}
                                    sx={{marginTop: "0.8em", marginBottom: "1.5em"}}
                                />
                                <br/>
                                <Typography variant="body2" fontSize="medium">{t("DIET_DESCRIPTION")}</Typography>
                                <TextField
                                    id="outlined-static"
                                    multiline
                                    label={"Allergies"}
                                    rows={1}
                                    defaultValue={""}
                                    sx={{marginTop: "0.8em", marginBottom: "0.8em"}}
                                />
                                <br/>
                                <br/>
                                <Typography variant="body2" fontSize="medium">{t("REMARKS")}</Typography>
                                <TextField
                                    id="outlined-static"
                                    multiline
                                    rows={1}
                                    defaultValue={""}
                                    label={"Remarks"}
                                    sx={{marginTop: "0.8em", marginBottom: "0.8em"}}
                                    onChange={saveRemarks}
                                />
                                <Button
                                    sx={{textTransform: "none", marginTop: "0.5em", width: "50%", marginRight: "50%"}}
                                    variant="contained" onClick={handleRegistration}>{t("REGISTER_BUTTON")}</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            );
        } else {
            return <div className={classes.root}>{invalidCodeMessage}</div>;
        }
    }
};

export default AttendanceView;
