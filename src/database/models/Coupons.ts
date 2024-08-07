import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';
import { v4 as uuidv4 } from 'uuid';
interface CouponsInterface {
    id?: number;
    createdAt?: number;
    updatedAt?: number;
    uuid: string;
    value: number;
}
class Coupons extends Model<CouponsInterface> implements CouponsInterface {
    declare id?: number;
    declare createdAt?: number;
    declare updatedAt?: number;
    declare uuid: string;
    declare value: number;
    static associate() {}
}

Coupons.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        uuid: {
            type: DataTypes.UUID,
            allowNull: true
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,

        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    },
    {
        modelName: 'Coupons',
        sequelize
    }
);
export default Coupons;
