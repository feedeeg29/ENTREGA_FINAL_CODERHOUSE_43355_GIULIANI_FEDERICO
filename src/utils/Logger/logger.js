// logger.js

import winston from 'winston';


const logLevels = {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
};


const logColors = {
    debug: 'blue',
    http: 'green',
    info: 'cyan',
    warning: 'yellow',
    error: 'red',
    fatal: 'red',
};


const errorTransport = new winston.transports.File({ filename: 'errors.log', level: 'error' });


//config dev enviroment
export const developmentLogger = winston.createLogger({
    levels: logLevels,
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console({ level: 'debug' }),
        errorTransport,
    ],
});

//config para production
export const productionLogger = winston.createLogger({
    levels: logLevels,
    format: winston.format.combine(
        winston.format.simple()
    ),
    transports: [errorTransport],
});

winston.addColors(logColors);
