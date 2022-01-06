import React from "react";
import {Card, CardContent, Divider, Grid, List, ListItem, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useTranslation} from "react-i18next";
import {Link, useLocation} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        textAlign: 'center',
    },
    card: {
        minWidth: "20em",
        maxWidth: "20em",
        textAlign: "center",
        backgroundImage: `url(${require('../images/loveshoot-lr-044-3.png')})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom'
    },
    linkWithoutDecoration: {
        textDecoration: 'none',
    },
});

const WeddingMenu: React.FC = () => {
    const location = useLocation();
    const {t} = useTranslation();
    const links: Array<{ url: string, text: string }> = [
        {url: "/", text: t("YOUR_ATTENDANCE")},
        {url: "/covid", text: t('COVID')},
        {url: "/program", text: t("PROGRAM")},
        {url: "/about", text: t("ABOUT")},
        {url: "/location", text: t("LOCATION")},
        {url: "/hotel", text: "Hotel"},
        {url: "/dresscode", text: t("DRESS_CODE_TITLE")},
        {url: "/gifts", text: t("GIFT_TITLE")},
        {url: "/photos", text: t("PICTURES_TITLE")}
    ];

    const classes = useStyles();
    return (
        <Grid item>
            <Card className={classes.card}>
                <CardContent>
                    <Typography align={"left"} variant="body2" fontSize="large" color="#001E3C" fontFamily="Times New Roman"
                                fontWeight="bold" >{t("MENU")}</Typography>
                    <Divider/>
                    <List component="ul">
                        {links.map((link, index) => {
                            return (
                                <ListItem key={`menuItem${index}`} alignItems="center" button component={Link} to={link.url}
                                          className={classes.linkWithoutDecoration} >
                                    <Typography align="center" sx={{width: "100%"}} variant="body2" fontSize="large"
                                                fontFamily="Times New Roman" fontWeight={location.pathname === link.url ? "bold" : "regular"}>{link.text}</Typography>
                                </ListItem>
                            );
                        })}
                    </List>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default WeddingMenu;
