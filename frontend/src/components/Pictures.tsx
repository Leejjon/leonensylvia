import {makeStyles} from "@mui/styles";
import React from "react";
import {useTranslation} from "react-i18next";
import {Button, Card, CardContent, Divider, Grid, MobileStepper, Typography} from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";

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
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'bottom'
    },
    img: {
        maxHeight: 285,
        maxWidth: 285,
        // overflow: 'hidden',
        // display: 'block',
        // width: '100%',
        paddingBottom: '0.5em'
    },
    backNextButtons: {
        // backgroundColor: "#FAFAFA"
    },
});

const images = [
    {
        label: "Leon & Sylvia",
        imgPath: require('../images/0011_bruiloft-011.jpg')
    }, {
        label: "Leon & Sylvia",
        imgPath: require('../images/0067_bruiloft-067.jpg')
    }, {
        label: "Leon & Sylvia",
        imgPath: require('../images/preview-005.jpg')
    }, {
        label: "Leon & Sylvia",
        imgPath: require('../images/0052_bruiloft-052.jpg')
    }, {
        label: "Leon & Sylvia",
        imgPath: require('../images/preview-008.jpg')
    }, {
        label: "Leon & Sylvia",
        imgPath: require('../images/preview-009.jpg')
    }, {
        label: "Leon & Sylvia",
        imgPath: require('../images/0080_bruiloft-080.jpg')
    }, {
        label: "Leon & Sylvia",
        imgPath: require('../images/preview-010.jpg')
    }, {
        label: "Leon & Sylvia",
        imgPath: require('../images/0083_bruiloft-083.jpg')
    }, {
        label: "Leon & Sylvia",
        imgPath: require('../images/preview-011.jpg')
    },    {
        label: "Leon & Sylvia",
        imgPath: require('../images/preview-016.jpg')
    },    {
        label: "Leon & Sylvia",
        imgPath: require('../images/preview-024.jpg')
    },    {
        label: "Leon & Sylvia",
        imgPath: require('../images/0194_bruiloft-194.jpg')
    },   {
        label: "Leon & Sylvia",
        imgPath: require('../images/preview-026.jpg')
    },{
        label: "Leon & Sylvia",
        imgPath: require('../images/preview-047.jpg')
    },{
        label: "Leon & Sylvia",
        imgPath: require('../images/0361_bruiloft-361.jpg')
    },{
        label: "Leon & Sylvia",
        imgPath: require('../images/0362_bruiloft-362.jpg')
    },{
        label: "Leon & Sylvia",
        imgPath: require('../images/0370_bruiloft-370.jpg')
    },{
        label: "Leon & Sylvia",
        imgPath: require('../images/0234_bruiloft-234.jpg')
    }
];

const Pictures: React.FC = () => {
    const classes = useStyles();
    const {t} = useTranslation();

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    const maxSteps = images.length;
    return (
        <Grid item>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="body2" fontSize="large" color="#001E3C" fontFamily="Times New Roman"
                                fontWeight="bold">{t("PICTURES_TITLE")}</Typography>
                    <Divider/><br/>
                    {/*<Typography variant="body2" fontSize="medium" fontFamily="Times New Roman">Onze foto's jeweetzelf.</Typography>*/}
                    {/*<a href="https://www.gerbenpul.nl/trouwfotografie/welkom-1" target="new"><u>{t("PICTURES_PROF")}</u></a>*/}
                    <SwipeableViews
                        enableMouseEvents
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        axis={'x'}>
                        {
                            images.map((step, index) => {
                                return (<div key={step.label}>
                                    {Math.abs(activeStep - index) <= 2 ? (
                                        <img className={classes.img} src={step.imgPath} alt={step.label}/>
                                    ) : null}
                                </div>);
                            })
                        }
                    </SwipeableViews>
                    <MobileStepper
                        className={classes.backNextButtons}
                        steps={maxSteps}
                        position="static"
                        variant="text"
                        activeStep={activeStep}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                <p>
                                    {t("NEXT")}
                                </p>
                                <KeyboardArrowRight sx={{paddingTop: "0px", marginTop: "0px"}} />
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                <KeyboardArrowLeft/>
                                {t("BACK")}
                            </Button>
                        }
                    />
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Pictures;
