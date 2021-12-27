import React, {useState} from 'react';
import './App.css';
import {makeStyles} from '@mui/styles';
import {Button, Card, CardActions, CardContent, Grid, TextField, Typography} from "@mui/material";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        textAlign: 'center',
    },
    card: {
        backgroundColor: "#fcf7f3",
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

const App: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <br/>
            <Typography variant="h1" sx={{fontFamily: "times new roman"}} fontSize="xxx-large">Leon & Sylvia</Typography>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="body2" fontSize="medium">
                        Op deze website kun jij je aanmelden voor onze bruiloft.
                    </Typography>
                    <br />
                    <div>
                        <TextField className={classes.textfield} id="outlined-basic" label="Vul hier je code in..." variant="outlined" />
                        &nbsp;
                        <Button sx={{height: "4em"}} variant="contained">Ok</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
