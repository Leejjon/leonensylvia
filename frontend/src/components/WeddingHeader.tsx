import React from "react";
import {Grid, Typography} from "@mui/material";
//color: '#E1B454'
const WeddingHeader: React.FC = () => {
    return (
        <Grid item xs={12} sx={{marginTop: "0.5em", marginBottom: "0em"}}>
            <Typography variant="h1" sx={{fontFamily: "times new roman", color: '#FFF2DF'}} fontSize="xxx-large">Leon &
                Sylvia</Typography>
        </Grid>
    );
};

export default WeddingHeader;
