import { Sequelize } from 'sequelize';
import { configs } from '../config/databaseConfig';
const sequelize: Sequelize = new Sequelize(configs.database, configs.username, configs.password, {
    host: configs.host,
    dialect: configs.dialect,
    port: Number(configs.port),
    logging: false,
    define: {
        timestamps: true,
        freezeTableName: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export default sequelize;
