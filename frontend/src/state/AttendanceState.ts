
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

class AttendanceState {
    guests: Array<Guest> = [];

    setGuests(guests: Array<Guest>) {
        this.guests = guests;
    }
}

let attendanceState = new AttendanceState();

export default attendanceState;
