import {default as initEnv} from '../app';
import express from 'express'
import expressLoader from '../loaders/express';
import config from '../loaders/config';

export const loadExpressApp = () => {
    initEnv();
    const app = express();
    expressLoader(app);
    return app;
}

const startServer = (app: express.Application) => {
    app.listen(config.port, () => {
        console.log(`Server listening on port: ${config.port}!`);
    }).on('error', err => {
        console.log(err);
        process.exit(1);
    })
}

if(process.env.NODE_ENV !== 'test') {
    const app = loadExpressApp()
    startServer(app);
}