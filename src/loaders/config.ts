import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'local'

if(process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test'){
    const envFound = dotenv.config();
    if(envFound.error){
        throw new Error("Couldn't find .env file");
    }
}

export default {
    nodeEnv: process.env.NODE_ENV,
    port: parseInt(process.env.PORT === undefined ? '5000' : process.env.PORT),
    api: {
        prefix: '/api'
    },
    eonetBaseUrl: process.env.EONET_BASE_URL ?? '',
    epicBaseUrl: process.env.EPIC_BASE_URL ?? '',
    epicArchiveUrl: process.env.EPIC_ARCHIVE_URL ?? ''
}