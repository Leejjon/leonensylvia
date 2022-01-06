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
import attendanceState, {Guest} from "../state/AttendanceState";
import {getHost} from "../service/Network";
import AttendanceOfGuest from "../components/AttendanceOfGuest";
import {useTranslation} from "react-i18next";
import SleepOverOfGuest from "../components/SleepOverOfGuest";
import AllergiesOfGuest from "../components/AllergiesOfGuest";
import WeddingInfo from "../components/WeddingInfo";
import WeddingHeader from "../components/WeddingHeader";
import WeddingMenu from "../components/WeddingMenu";
import Registration from "../components/Registration";
import Location from "../components/Location";
import {BrowserRouter, Route} from "react-router-dom";
import About from "../components/About";
import Covid from "../components/Covid";
import ExtendedWeddingInfo from "../components/ExtendedWeddingInfo";
import Overnachten from "../components/Overnachten";
import DressCode from "../components/DressCode";
import Gifts from "../components/Gifts";
import Pictures from "../components/Pictures";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        textAlign: 'center',
        marginBottom: "1em"
    },
    card: {
        minWidth: "20em",
        maxWidth: "20em",
        textAlign: "left",
        backgroundImage: `url(${require('../images/loveshoot-lr-044-3.png')})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom'
    },
    progress: {
        margin: '8em',
    },
    inputField: {
        "& textarea": {
            fontFamily: "Times New Roman"
        }
    }
});

export interface AttendanceProps {
    code: string
    formCompleted: boolean,
    setFormCompleted: (formCompleted: boolean) => void
}

const AttendanceView: React.FC<AttendanceProps> = ({code, formCompleted, setFormCompleted}) => {
    const classes = useStyles();
    const {t} = useTranslation();
    const [loading, setLoading] = useState(true);

    const [invalidCodeMessage, setInvalidCodeMessage] = useState<string | undefined>(undefined);
    const [emailInvalidMessage, setEmailInalidMessage] = useState<string | undefined>(undefined);
    const [tempEmail, setTempEmail] = useState("");
    const [tempRemarks, setTempRemarks] = useState("");

    const theUseEffectFunction = () => {
        if (attendanceState.guests.length > 0) {
            setLoading(false);
            setTempEmail(attendanceState.guests[0].email as string);
            setTempRemarks(attendanceState.guests[0].remarks as string);
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
                    if (attendanceState.guests.length > 0) {
                        setTempEmail(attendanceState.guests[0].email as string);
                        setTempRemarks(attendanceState.guests[0].remarks as string);
                        if (attendanceState.guests[0].formCompleted) {
                            setFormCompleted(true);
                        }
                    }
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
    }

    useEffect(theUseEffectFunction, [setFormCompleted]);

    const validateEmail = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const changedEmail = event.target.value;
        setTempEmail(changedEmail);
        // Source: https://stackoverflow.com/questions/46370725/how-to-do-email-validation-using-regular-expression-in-typescript
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (regexp.test(changedEmail)) {
            for (let i in attendanceState.guests) {
                attendanceState.guests[i].email = changedEmail;
            }
            setEmailInalidMessage(undefined);
        } else if (changedEmail === "") {
            setEmailInalidMessage(undefined);
        } else {
            setEmailInalidMessage("E-mail invalid");
        }
    };

    const saveRemarks = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const remarks = event.target.value;
        setTempRemarks(remarks);
        if (remarks) {
            attendanceState.guests[0].remarks = remarks;
        }
    }

    const handleRegistration = async () => {
        for (let i in attendanceState.guests) {
            attendanceState.guests[i].formCompleted = true;
        }

        const response = await fetch(getHost() + "/api/invitation", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                invitation: localStorage.getItem('invitation') as string
            },
            body: JSON.stringify(attendanceState.guests)
        });

        if (response.status === 200) {
            setFormCompleted(true);
        }
    }

    const undoRegistration = async () => {
        setFormCompleted(false)
        theUseEffectFunction();
    }

    if (loading) {
        return <div className={classes.root}><CircularProgress className={classes.progress}/></div>
    } else if (formCompleted) {
        return (
            <Grid container justifyContent="center" spacing={2} className={classes.root}>

                <BrowserRouter>
                    <WeddingHeader/>
                    <WeddingMenu/>
                    <Route exact path="/"  render={() => (
                        <Registration undoRegistration={undoRegistration}/>
                    )} />
                    <Route path="/covid" component={Covid} />
                    <Route path="/program" component={ExtendedWeddingInfo} />
                    <Route path="/about" component={About} />
                    <Route path="/location" component={Location} />
                    <Route path="/hotel" component={Overnachten} />
                    <Route path="/dresscode" component={DressCode} />
                    <Route path="/gifts" component={Gifts} />
                    <Route path="/photos" component={Pictures} />
                </BrowserRouter>
            </Grid>
    )
        ;
    } else {
        if (attendanceState.guests.length > 0) {
            return (
                <Grid container justifyContent="center" spacing={2} className={classes.root}>
                    <WeddingHeader/>
                    <WeddingInfo/>
                    <Grid item>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="body2" fontSize="large" color="#001E3C"
                                            fontFamily="Times New Roman"
                                            fontWeight="bold">{t("YOUR_ATTENDANCE")}</Typography>
                                <Divider/><br/>
                                <Typography variant="body2" fontFamily="Times New Roman"
                                            fontSize="medium">{attendanceState.guests.length === 1 ? t("ATTEND_MESSAGE") : t("ATTEND_PLURAL_MESSAGE")}</Typography>
                                <List sx={{marginBottom: "0.4em"}}>
                                    {attendanceState.guests.length > 0 && attendanceState.guests.map((guest, index) => {
                                        return <ListItem
                                            sx={{paddingLeft: "0px", paddingTop: "0px", paddingBottom: "0px"}}
                                            key={`attendance${guest.name}`}><AttendanceOfGuest guest={guest}
                                                                                               index={index}/></ListItem>;
                                    })}
                                </List>
                                {attendanceState.guests[0].allowedToSleepOver &&
                                    <>
                                        <Typography variant="body2" fontFamily="Times New Roman"
                                                    fontSize="medium">{attendanceState.guests.length === 1 ? t("SLEEP_OVER") : t("SLEEP_OVER_PLURAL")}</Typography>
                                        <List sx={{marginBottom: "0.4em"}}>
                                            {attendanceState.guests.map((guest, index) => {
                                                return (
                                                    <ListItem sx={{
                                                        paddingLeft: "0px",
                                                        paddingTop: "0px",
                                                        paddingBottom: "0px"
                                                    }} key={`sleepOver${guest.name}`}>
                                                        <SleepOverOfGuest guest={guest} index={index}/>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </>
                                }
                                <Typography variant="body2" fontSize="medium"
                                            fontFamily="Times New Roman">{t("EMAIL_DESCRIPTION")}</Typography>
                                <TextField
                                    className={classes.inputField}
                                    error={emailInvalidMessage !== undefined}
                                    helperText={emailInvalidMessage !== undefined ? emailInvalidMessage : undefined}
                                    id="outlined-static"
                                    multiline
                                    label={t("EMAIL_HERE")}
                                    rows={1}
                                    value={tempEmail}
                                    hiddenLabel
                                    onChange={validateEmail}
                                    sx={{marginTop: "0.8em", marginBottom: "1.5em"}}
                                />
                                <br/>
                                <Typography variant="body2" fontFamily="Times New Roman"
                                            fontSize="medium">{t("DIET_DESCRIPTION")}</Typography>
                                {attendanceState.guests.map((guest: Guest, index) => {
                                    return <AllergiesOfGuest key={`allergiesOf${guest.name}`} guest={guest}
                                                             index={index}/>
                                })}
                                <br/>
                                <br/>
                                <Typography variant="body2" fontSize="medium"
                                            fontFamily="Times New Roman">{t("REMARKS")}</Typography>
                                <TextField
                                    className={classes.inputField}
                                    id="outlined-static"
                                    multiline
                                    rows={1}
                                    value={tempRemarks}
                                    label={t("REMARKS_LABEL")}
                                    sx={{marginTop: "0.8em", marginBottom: "0.8em", fontFamily: "Times New Roman"}}
                                    onChange={saveRemarks}
                                />
                                <Button
                                    sx={{
                                        textTransform: "none",
                                        marginTop: "0.5em",
                                        width: "50%",
                                        marginRight: "50%",
                                        fontFamily: "Times New Roman"
                                    }}
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
