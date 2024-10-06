import { HttpStatusCode } from "src/enums/http-status-codes.enum";

export const statusMessages = {
    [HttpStatusCode.OK]: 'Success',
    [HttpStatusCode.FORBIDDEN]: 'Forbidden',
    [HttpStatusCode.BAD_REQUEST]: 'Bad Request',
    [HttpStatusCode.NOT_FOUND]: 'Not Found',
    [HttpStatusCode.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
}