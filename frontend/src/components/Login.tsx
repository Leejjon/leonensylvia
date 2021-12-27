import {makeStyles} from "@mui/styles";
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, {ChangeEvent, useRef, useState} from "react";

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
        maxWidth: "20em"
    },
    textfield: {
        flexGrow: 1,
        maxWidth: '11em',
    },
});

export interface LoginProps {
    storeInvitationCode: (code: string) => void
}

const Login: React.FC<LoginProps> = ({storeInvitationCode}) => {
    const classes = useStyles();
    const textFieldValueReference = useRef<HTMLInputElement>();
    const [invalidMessage, setInvalidMessage] = useState<string | undefined>(undefined);

    const onTextFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!event.target.value) {
            setInvalidMessage(undefined);
        }
    }

    const validateAndStore = (code: string | undefined) => {
        if (code) {
            storeInvitationCode(code);
        } else {
            setInvalidMessage("Please enter a valid code.");
        }
    };

    return (
        <div className={classes.root}>
            <br/>
            <Typography variant="h1" sx={{fontFamily: "times new roman"}} fontSize="xxx-large">Leon &
                Sylvia</Typography>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="body2" fontSize="medium">Je kunt je hier aanmelden voor onze
                        bruiloft.</Typography>
                    <br/>
                    <div>
                        <TextField className={classes.textfield} id="outlined-basic" label="Vul hier je code in..."
                                   variant="outlined" inputRef={textFieldValueReference}
                                   helperText={invalidMessage !== undefined ? invalidMessage : undefined}
                                   onChange={(event) => {
                                       onTextFieldChange(event)
                                   }}/>
                        &nbsp;
                        <Button sx={{height: "4em"}} variant="contained"
                                onClick={() => validateAndStore(textFieldValueReference.current?.value)}><ArrowForwardIcon/></Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
