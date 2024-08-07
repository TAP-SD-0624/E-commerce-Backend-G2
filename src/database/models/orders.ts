import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../connection';
interface OrderInterface {
    id?: number;
    productId: number;
    userId: number;
    addressId: number;
    transactionId: number;
    createdAt?: number;
    updatedAt?: number;
}

class Orders extends Model<OrderInterface> implements OrderInterface {
    declare id?: number;
    declare productId: number;
    declare userId: number;
    declare addressId: number;
    declare transactionId: number;
    declare createdAt?: number;
    declare updatedAt?: number;
    static associate() {}
}

Orders.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        transactionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        addressId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
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
        modelName: 'Orders',
        sequelize
    }
);
export default Orders;
