import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';
import Products from './products';
export interface ImagesInterface {
    id?: number;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    productId: number;
    imageUrl: string;
}
class Images extends Model<ImagesInterface> implements ImagesInterface {
    declare id?: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare productId: number;
    declare imageUrl: string;
    static associate() {
        Images.belongsTo(Products, { foreignKey: 'productId' });
    }
}
Images.init(
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
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
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
        modelName: 'Images',
        sequelize
    }
);
export default Images;
