import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';
dotenv.config();
interface configsInterface {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
    port: string;
}
export let configs: configsInterface;

if (process.env.NODE_ENV === 'test') {
    configs = {
        username: process.env.DB_TESTING_USERNAME || 'postgres',
        password: process.env.DB_TESTING_PASSWORD || '12345',
        database: process.env.DB_TESTING_DATABASE || 'ecommerce_test',
        dialect: (process.env.DB_TESTING_DIALECT as Dialect) || 'postgres',
        host: process.env.DB_TESTING_HOST || 'localhost',
        port: process.env.DB_TESTING_PORT || '5432'
    };
} else if (process.env.NODE_ENV === 'production') {
    configs = {
        username: process.env.DB_PRODUCTION_USERNAME || 'postgres',
        password: process.env.DB_PRODUCTION_PASSWORD || '12345',
        database: process.env.DB_PRODUCTION_DATABASE || 'ecommerce_dev',
        dialect: (process.env.DB_PRODUCTION_DIALECT as Dialect) || 'postgres',
        host: process.env.DB_PRODUCTION_HOST || 'localhost',
        port: process.env.DB_PRODUCTION_PORT || '5432'
    };
} else {
    configs = {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || '12345',
        database: process.env.DB_DATABASE || 'ecommerce_dev',
        dialect: (process.env.DB_TESTING_DIALECT as Dialect) || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '5432'
    };
}

export const firebaseConfigs = {
    apiKey: process.env.FB_APIKEY,
    authDomain: process.env.FB_AUTHDOMAIN,
    projectId: process.env.FB_PROJECTID,
    storageBucket: process.env.FB_STORAGEBUCKET,
    messagingSenderId: process.env.FB_MESSAGINGSENDERID,
    appId: process.env.FB_APPID
};
