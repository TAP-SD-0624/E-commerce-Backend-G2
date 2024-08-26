import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';
import Products from './products';
import Categories from './categories';
export interface ProductsCategoriesInterface {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    productId: number;
    categoryId: number;
}
class ProductsCategories extends Model<ProductsCategoriesInterface> implements ProductsCategoriesInterface {
    declare id?: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare productId: number;
    declare categoryId: number;
    static associate() {
        ProductsCategories.belongsTo(Products, { foreignKey: 'productId' });
        ProductsCategories.belongsTo(Categories, { foreignKey: 'categoryId' });
    }
}
ProductsCategories.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
        modelName: 'ProductsCategories'
    }
);
export default ProductsCategories;
