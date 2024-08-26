import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../connection';
import Products from './products';
import ProductsCategories from './ProductsCategories';
export interface CategoriesInterface {
    id?: number;
    title: string;
    imageUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class Categories extends Model<CategoriesInterface> implements CategoriesInterface {
    declare id?: number;
    declare title: string;
    declare imageUrl: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
    static associate() {
        Categories.belongsToMany(Products, { through: ProductsCategories, foreignKey: 'categoryId' });
        Categories.hasMany(ProductsCategories, { as: 'cateToProducts', foreignKey: 'categoryId' });
    }
}

Categories.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
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
        modelName: 'Categories',
        sequelize
    }
);
export default Categories;
