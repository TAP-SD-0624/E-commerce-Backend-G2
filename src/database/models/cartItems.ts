import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../connection';
import Cart from './cart';
import Products from './products';

interface CartItemsInterface {
    id?: number;
    cartId: number;
    productId: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

class CartItems extends Model<CartItemsInterface> implements CartItemsInterface {
    declare id?: number;
    declare cartId: number;
    declare productId: number;
    declare quantity: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;

    static associate() {
        CartItems.belongsTo(Cart, { foreignKey: 'cartId' });
        CartItems.belongsTo(Products, { foreignKey: 'productId' });
    }
}

CartItems.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cart,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'CartItems'
});

export default CartItems;