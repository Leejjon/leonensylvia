import {google} from 'googleapis';
import {GoogleAuth} from "google-auth-library/build/src/auth/googleauth";

const environment = process.env.NODE_ENV || "development";

export interface Guest {
    name: string,
    fromCeremony: boolean,
    fromDrinks: boolean,
    allowedToSleepOver: boolean
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
        spreadsheetId: '1s3uMlBTY5cY4bbUpnTxRVsmdXFB1F2TZWpWHyGZ2xHE',
        range: 'Sheet1!A2:F'
    });

    return result
        .data
        .values?.filter((rows) => {
            return rows[0] === invitationCode;
        })
        .map((guest) => <Guest>{
            name: guest[1],
            fromCeremony: guest[3],
            fromDrinks: guest[4],
            allowedToSleepOver: guest[5]
        }) as Array<Guest>;
}
