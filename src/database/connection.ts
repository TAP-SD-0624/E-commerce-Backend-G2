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
    }
});
export default sequelize;
