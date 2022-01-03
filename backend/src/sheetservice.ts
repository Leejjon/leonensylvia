import {google} from 'googleapis';
import {GoogleAuth} from "google-auth-library/build/src/auth/googleauth";

const environment = process.env.NODE_ENV || "development";

export class Guest {
    name: string;
    email: string;
    fromCeremony: boolean;
    fromDrinks: boolean;
    allowedToSleepOver: boolean;
    attending: boolean;
    sleepingOver: boolean;
    diet: string;
    remarks: string;
    formCompleted: boolean;

    constructor(name: string, email: string, fromCeremony: boolean, fromDrinks: boolean, allowedToSleepOver: boolean, attending: boolean, sleepingOver: boolean, diet: string, remarks: string, formCompleted: boolean) {
        this.name = name;
        this.email = email;
        this.fromCeremony = fromCeremony;
        this.fromDrinks = fromDrinks;
        this.allowedToSleepOver = allowedToSleepOver;
        this.attending = attending;
        this.sleepingOver = sleepingOver;
        this.diet = diet;
        this.remarks = remarks;
        this.formCompleted = formCompleted;
    }
}

const getAuthClient = () => {
    if (environment === "development") {
        return new google.auth.GoogleAuth({
            keyFile: "../secrets/leonensylvia-beae44d12f47.json",
            // Scopes can be specified either as an array or as a single, space-delimited string.
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });
    } else {
        return new google.auth.GoogleAuth({
            // Scopes can be specified either as an array or as a single, space-delimited string.
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });
    }
}

export const getInvitationByCode = async (invitationCode: string): Promise<Array<Guest>> => {
    const authClient = await getAuthClient();

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
            const guest2: Guest = {
                name: guest[1],
                email: guest[8],
                fromCeremony: guest[5] === "1",
                fromDrinks: guest[6] === "1",
                allowedToSleepOver: guest[7] === "1",
                attending: guest[9] === "1",
                sleepingOver: guest[10] === "1",
                diet: guest[11],
                remarks: guest[12],
                formCompleted: guest[13] === "1"
            };
            return guest2;
        }) as Array<Guest>;
}

export const putAttendanceInSheet = async (invitationCode: string, guests: Array<Guest>): Promise<void> => {
    const authClient = await getAuthClient();

    const sheets = google.sheets({
        version: "v4",
        auth: authClient
    });

    let rowsToUpdate: number[] = [];
    const retrieveRowResult = await sheets.spreadsheets.values.get({
        spreadsheetId: '1JVVEncPIZlfgAQYKJdvaiZFP5IQoUxFqD7TIEEmkmF4',
        majorDimension: "ROWS",
        range: 'Gasten!A2:A150'
    });
    retrieveRowResult.data.values?.filter((rows: any[], index: number) => {
        if (rows[0] === invitationCode.toLowerCase()) {
            // The +2 is because the index starts at 0, and the first A1 field is a column header
            rowsToUpdate.push(index+2);
            return true;
        } else {
            return false;
        }
    });

    const updateData = [];
    for (let i = 0; i < rowsToUpdate.length; i++) {
        const row = rowsToUpdate[i];
        const guest = guests[i];
        updateData.push({
            range: `Gasten!I${row}`,
            values: [[guest.email, guest.attending ? 1 : 0, guest.sleepingOver ? 1 : 0, guest.diet, guest.remarks, guest.formCompleted ? 1 : 0]]
        });
    }

    await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: '1JVVEncPIZlfgAQYKJdvaiZFP5IQoUxFqD7TIEEmkmF4',
        requestBody: {
            data: updateData,
            valueInputOption: "USER_ENTERED"
        }
    }, (err: Error | null) => {
        if (err) {
            console.log(err);
        }
    });
}
