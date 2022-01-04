import {makeStyles} from "@mui/styles";
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, {ChangeEvent, useRef, useState} from "react";
import {getHost} from "../service/Network";
import attendanceState from "../state/AttendanceState";
import {useTranslation} from "react-i18next";
import WeddingHeader from "../components/WeddingHeader";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        textAlign: 'center',
    },
    card: {
        marginTop: "1em",
        marginLeft: "auto",
        marginRight: "auto",
        minWidth: "20em",
        maxWidth: "20em",
        minHeight: "15em",
        backgroundImage: `url(${require('../images/loveshoot-lr-044-3.png')})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom'
    },
    textfield: {
        flexGrow: 1,
        maxWidth: '11em',
        fontFamily: "Times New Roman"
    },
});

export interface LoginProps {
    storeInvitationCode: (code: string) => void
}

const LoginView: React.FC<LoginProps> = ({storeInvitationCode}) => {
    const classes = useStyles();
    const {t} = useTranslation();
    const textFieldValueReference = useRef<HTMLInputElement>();
    const [invalidMessage, setInvalidMessage] = useState<string | undefined>(undefined);

    const onTextFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!event.target.value) {
            setInvalidMessage(undefined);
        }
    }

    const validateAndStore = async (code: string | undefined) => {
        if (code) {
            try {
                let response = await fetch(getHost() + "/api/invitation", {
                    method: "GET", headers: {invitation: code}
                });

                if (response.status === 200) {
                    let invitationData = await response.json();
                    if (invitationData.length > 0) {
                        attendanceState.setGuests(invitationData);
                        storeInvitationCode(code);
                        setInvalidMessage(undefined);
                        return;
                    }
                }
            } catch (error) {
                console.log(error);
            }
            setInvalidMessage("Couldn't verify if the code was valid.");
        } else {
            setInvalidMessage("Please enter a valid code.");
        }
    };

    return (
        <div className={classes.root}>
            <br/>
            <WeddingHeader/>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">{t("REGISTER_HERE")}</Typography>
                    <br/>
                    <div>
                        <TextField className={classes.textfield} id="outlined-basic" label={t("ENTER_YOUR_CODE")}
                                   variant="outlined" inputRef={textFieldValueReference}
                                   helperText={invalidMessage !== undefined ? invalidMessage : undefined}
                                   onChange={(event) => {
                                       onTextFieldChange(event)
                                   }}/>
                        <Button sx={{height: "4em", marginLeft: "1em"}} variant="contained"
                                onClick={() => validateAndStore(textFieldValueReference.current?.value)}><ArrowForwardIcon/></Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginView;
