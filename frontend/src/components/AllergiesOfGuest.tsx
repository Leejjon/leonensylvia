import React, {ChangeEvent, useState} from "react";
import attendanceState, {Guest} from "../state/AttendanceState";
import {TextField} from "@mui/material";
import {useTranslation} from "react-i18next";

export interface AllergiesOfGuestProps {
    guest: Guest,
    index: number
}

const AllergiesOfGuest: React.FC<AllergiesOfGuestProps> = ({guest, index}) => {
    const {t} = useTranslation();

    const storeAllergy = (event: ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
        attendanceState.guests[index].diet = event.target.value;
    }

    return (
        <TextField
            id="outlined-static"
            multiline
            label={t("ALLERGIES_NAME", {name: guest.name})}
            rows={1}
            defaultValue={guest.diet ? guest.diet : ""}
            sx={{marginTop: "0.8em", marginBottom: "0em"}}
            onChange={storeAllergy}
        />
    );
}

export default AllergiesOfGuest;
