import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';
import Users from './users';
import Orders from './orders';
interface TransactionsInterface {
    id?: number;
    userId: number;
    paymentStatus: string;
    shipingStatus: string;
    updatedAt?: Date;
    createdAt?: Date;
    shipingAddress: string;
    totalPrice: number;
}

class Transactions extends Model<TransactionsInterface> implements TransactionsInterface {
    declare id?: number;
    declare userId: number;
    declare paymentStatus: string;
    declare shipingStatus: string;
    declare totalPrice: number;
    declare shipingAddress: string;
    declare readonly updatedAt?: Date;
    declare readonly createdAt?: Date;
    static associate() {
        Transactions.belongsTo(Users, { foreignKey: { name: 'userId' } });
        Transactions.hasMany(Orders, { foreignKey: { name: 'transactionId' } });
    }
}
Transactions.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        paymentStatus: {
            type: DataTypes.STRING
        },
        shipingStatus: {
            type: DataTypes.STRING
        },
        shipingAddress: {
            type: DataTypes.STRING
        },
        totalPrice: {
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER,
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
        sequelize,
        modelName: 'Transactions'
    }
);

export default Transactions;
