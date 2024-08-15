import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../connection';
import Ratings from './ratings';
import Orders from './orders';
import Images from './Images';
import Cart from './cart';
import Wishlist from './wishlist';
import Brands from './brands';
import Categories from './categories';
import ProductsCategories from './ProductsCategories';
export interface ProductsInterface {
    id?: number;
    brandId: number;
    label: string;
    description: string;
    price: number;
    discount?: number;
    title: string;
    quantity: number;
    imageUrl: string;
    categoriesIds?: Array<{}>;
    imagesUrls?: Array<{}>;
    tags: Array<string>;
    rating?: Number;
    orders?: number;
    totalRatings?: number;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
class Products extends Model<ProductsInterface> implements ProductsInterface {
    declare id?: number;
    declare brandId: number;
    declare label: string;
    declare description: string;
    declare price: number;
    declare discount: number;
    declare title: string;
    declare quantity: number;
    declare imageUrl: string;
    declare tags: Array<string>;
    declare rating: Number;
    declare orders: number;
    declare totalRatings: number;
    declare categoriesIds: Array<{}>;
    declare imagesUrls: Array<{}>;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
    static associate() {
        Products.hasMany(Ratings, { foreignKey: 'productId' });
        Products.hasMany(Orders, { foreignKey: 'productId' });
        Products.hasMany(Images, { foreignKey: 'productId', as: 'imagesUrls' });
        Products.hasMany(Cart, { foreignKey: 'productId' });
        Products.hasMany(Wishlist, { foreignKey: 'productId' });
        Products.belongsTo(Brands, { foreignKey: 'brandId' });
        Products.belongsToMany(Categories, { through: ProductsCategories, foreignKey: 'productId' });
        Products.hasMany(ProductsCategories, { foreignKey: 'productId', as: 'categoriesIds' });
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
        label: {
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
            allowNull: true,
            defaultValue: 0
        },
        title: {
            type: new DataTypes.STRING(),
            allowNull: false
        },
        quantity: {
            type: new DataTypes.INTEGER(),
            allowNull: false
        },
        imageUrl: {
            type: new DataTypes.STRING(),
            allowNull: false
        },
        tags: {
            type: new DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },

        rating: {
            type: new DataTypes.FLOAT(),
            allowNull: false,
            defaultValue: 0
        },
        totalRatings: {
            type: new DataTypes.INTEGER(),
            allowNull: false,
            defaultValue: 0
        },
        orders: {
            type: new DataTypes.INTEGER(),
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        modelName: 'Products',
        sequelize
    }
);
export default Products;
