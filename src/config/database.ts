import { Sequelize } from 'sequelize';
require('dotenv').config();

const sequelize: Sequelize = new Sequelize(
    process.env.DB_NAME ?? 'sequelizeJWT',
    process.env.DB_USER ?? 'root',
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST ?? 'localhost',
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true,
            freezeTableName: true,
        }
    }
);

const testConnection = async (): Promise<boolean> => {
    try {
        await sequelize.authenticate();
        console.log('🔌 Connected to the database.');
        return true;
    } catch (error) {
        console.error('‼️ Unable to connect to the database:', error);
        return false;
    }
};

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('🪢 Database connection established successfully.');
    } catch (error) {
        console.error('‼️ Unable to connect to the database:', error);
        throw error;
    }
};

export default sequelize;