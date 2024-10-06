import errors from '../utils/errors';
import config from './config';
import express, {NextFunction, Request, Response} from 'express'
import { isCelebrateError } from 'celebrate';
import {values} from 'lodash'
import routes from '../api/api.routes';

export default (app: express.Application): void => {

    // Disable x-powered-by header
    app.set('x-powered-by', false);

    // Security headers
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.set({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS,PATCH',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,X-Amz-Security-Token,X-Amz-User-Agent',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-store',
            'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
            'Expect-CT': 'max-age=86400, enforce',
            'Referrer-Policy': 'strict-origin',
            'Strict-Transport-Security': 'max-age=63072000',
            'X-XSS-Protection': '1; mode=block',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY'
        });
        next()
    })

    app.use(express.json());
    app.use(express.urlencoded({extended: true}))

    app.use(config.api.prefix, routes);

    app.use((req: Request, res: Response, next: NextFunction) => {
        const err = new errors.NotFoundError('Invalid URL');
        next(err);
    })

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        let errorHandled = false;

        if(isCelebrateError(err)) {
            const headersMessage = err.details.get('headers')?.message;
            const paramsMessage = err.details.get('params')?.message;
            const queryMessage = err.details.get('query')?.message;
            const bodyMessage = err.details.get('body')?.message;
            const errorMessage = headersMessage || paramsMessage || queryMessage || bodyMessage;
            res.status(400).json({error: true, message: errorMessage || 'We were unable to validate your input'});
            errorHandled = true;
        }

        for (const expectedError of values(errors)){
            if(err.name === expectedError.name) {
                res.status(400).json({error: true, message: err.message});
                errorHandled = true;
            }
        }

        if(!errorHandled) {
            next(err);
        }
    })

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500).json({error: true, message: 'Something went wrong, please try again later'})
    })


}