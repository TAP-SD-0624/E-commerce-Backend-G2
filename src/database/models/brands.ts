import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../connection';
import Products from './products';
interface BrandsInterface {
    id?: number;
    name: string;
    image: string;
}
class Brands extends Model<BrandsInterface> implements BrandsInterface {
    declare id?: number;

    declare name: string;
    declare image: string;
    static associate() {
        Brands.hasMany(Products, { foreignKey: 'brandId' });
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
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        modelName: 'Brands',
        sequelize
    }
);
export default Brands;
