import {google} from 'googleapis';
import {GoogleAuth} from "google-auth-library/build/src/auth/googleauth";

const environment = process.env.NODE_ENV || "development";

export interface Guest {
    name: string,
    email: string,
    fromCeremony: boolean,
    fromDrinks: boolean,
    allowedToSleepOver: boolean,
    attending: boolean
    sleepingOver: boolean,
    diet: string,
    remarks: string
    formCompleted: boolean
}

export const getInvitationByCode = async (invitationCode: string): Promise<Array<Guest>> => {
    let auth: GoogleAuth | undefined;

    if (environment === "development") {
        auth = new google.auth.GoogleAuth({
            keyFile: "../secrets/leonensylvia-beae44d12f47.json",
            // Scopes can be specified either as an array or as a single, space-delimited string.
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });
    } else {
        auth = new google.auth.GoogleAuth({
            // Scopes can be specified either as an array or as a single, space-delimited string.
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });
    }
    const authClient = await auth.getClient();

    const sheets = google.sheets({
        version: "v4",
        auth: authClient
    });
    const result = await sheets.spreadsheets.values.get({
        spreadsheetId: '1JVVEncPIZlfgAQYKJdvaiZFP5IQoUxFqD7TIEEmkmF4',
        range: 'Gasten!A2:N'
    });

    return result
        .data
        .values?.filter((rows) => {
            return rows[0] === invitationCode.toLowerCase();
        })
        .map((guest) => {
            return <Guest>{
                name: guest[1],
                email: guest[8],
                fromCeremony: guest[5],
                fromDrinks: guest[6],
                allowedToSleepOver: guest[7],
                attending: guest[9],
                sleepingOver: guest[10],
                diet: guest[11],
                remarks: guest[12],
                formCompleted: guest[13]
        }}) as Array<Guest>;
}
