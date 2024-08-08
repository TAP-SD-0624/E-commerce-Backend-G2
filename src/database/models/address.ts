import sequelize from '../connection';
import { Model, DataTypes } from 'sequelize';
import Orders from './orders';
import Users from './users';

interface AddressInterface {
    id?: number;
    userId: number;
    state: string;
    street: string;
    city: string;
    zipcode: number;
    fullName: string;
    mobile: string;
    createdAt?: number;
    updatedAt?: number;
}
class Address extends Model<AddressInterface> implements AddressInterface {
    declare id?: number;
    declare userId: number;
    declare state: string;
    declare street: string;
    declare city: string;
    declare zipcode: number;
    declare fullName: string;
    declare mobile: string;
    declare createdAt?: number;
    declare updatedAt?: number;
    static associate() {
        Address.hasMany(Orders, { foreignKey: { name: 'addressId' } });
        Address.belongsTo(Users, { foreignKey: 'userId' });
    }
}
Address.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zipcode: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    },
    {
        modelName: 'Address',
        sequelize
    }
);
export default Address;
