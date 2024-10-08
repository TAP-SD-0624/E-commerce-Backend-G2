import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../connection';
import Products from './products';
export interface BrandsInterface {
    id?: number;
    name: string;
    imageUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
    Products?: {};
}
class Brands extends Model<BrandsInterface> implements BrandsInterface {
    declare id?: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare name: string;
    declare imageUrl: string;
    static associate() {
        Brands.hasMany(Products, { foreignKey: 'brandId', as: 'Products' });
    }
}
Brands.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },

        name: {
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
        modelName: 'Brands',
        sequelize
    }
);
export default Brands;
