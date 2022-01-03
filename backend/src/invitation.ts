import {Request, Response} from "express";
import {getInvitationByCode, Guest, putAttendanceInSheet} from "./sheetservice";
import { plainToInstance} from "class-transformer";

enum ErrorScenarios {
    INTERNAL_ERROR,
    INVALID_INVITATION
}


export const getInvitation = async (req: Request, res: Response) => {
    const invitation = req.headers["invitation"];

    if (invitation) {
        const sheetdata = await getInvitationByCode(invitation as string);
        res.contentType('application/json');
        res.status(200);
        res.send(sheetdata);
    } else {
        mapError(res, ErrorScenarios.INVALID_INVITATION);
    }
}

export const putInvitation = async (req: Request, res: Response) => {
    const invitation = req.headers["invitation"];
    const guests = plainToInstance(Guest, req.body);
    if (invitation) {
        await putAttendanceInSheet(invitation as string, guests);
        res.contentType('application/json');
        res.sendStatus(200);
    } else {
        mapError(res, ErrorScenarios.INVALID_INVITATION);
    }
}

const mapError = (res: Response, error: ErrorScenarios) => {
    switch (error) {
        case ErrorScenarios.INVALID_INVITATION:
            respond(res, 400, 'Invalid input');
            break;
        default:
            respond(res, 500, 'An error occurred on our side, sorry!');
    }
}

const respond = (res: Response, status: number, message: string) => {
    res.status(status);
    res.send(message);
}
