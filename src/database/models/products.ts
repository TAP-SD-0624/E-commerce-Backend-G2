import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../connection';
import Ratings from './ratings';
import Orders from './orders';
import Images from './Images';
import Cart from './cart';
import Wishlist from './wishlist';
interface ProductsInterface {
    id?: number;
    brandId: number;
    detail: string;
    description: string;
    price: number;
    discount: number;
    title: string;
    quantity: number;
    image: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
class Products extends Model<ProductsInterface> implements ProductsInterface {
    declare id?: number;
    declare brandId: number;
    declare detail: string;
    declare description: string;
    declare price: number;
    declare discount: number;
    declare title: string;
    declare quantity: number;
    declare image: string;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
    static associate() {
        Products.hasMany(Ratings, { foreignKey: 'productId' });
        Products.hasMany(Orders, { foreignKey: 'productId' });
        Products.hasMany(Images, { foreignKey: 'productId' });
        Products.hasMany(Cart, { foreignKey: 'productId' });
        Products.hasMany(Wishlist, { foreignKey: 'productId' });
    }
}
Products.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        brandId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        detail: {
            type: new DataTypes.STRING(),
            allowNull: false
        },
        description: {
            type: new DataTypes.STRING(),
            allowNull: false
        },
        price: {
            type: new DataTypes.INTEGER(),
            allowNull: false
        },
        discount: {
            type: new DataTypes.INTEGER(),
            allowNull: false
        },
        title: {
            type: new DataTypes.STRING(),
            allowNull: false
        },
        quantity: {
            type: new DataTypes.INTEGER(),
            allowNull: false
        },
        image: {
            type: new DataTypes.STRING(),
            allowNull: false
        }
    },
    {
        modelName: 'Products',
        sequelize
    }
);
export default Products;
