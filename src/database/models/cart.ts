import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../connection';
import Products from './products';
import Users from './users';
interface CartInterface {
    id?: number;
    userId: number;
    productId: number;
    createdAt?: number;
    updatedAt?: number;
}
class Cart extends Model<CartInterface> implements CartInterface {
    declare id?: number;
    declare userId: number;
    declare productId: number;
    declare createdAt?: number;
    declare updatedAt?: number;
    static associate() {
        Cart.belongsTo(Products, { foreignKey: 'productId' });
        Cart.belongsTo(Users, { foreignKey: 'userId' });
    }
}
Cart.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        productId: {
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
        modelName: 'Cart',
        sequelize
    }
);
export default Cart;
