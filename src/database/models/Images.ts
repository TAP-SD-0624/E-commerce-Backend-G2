import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';
interface ImagesInterface {
    id?: number;
    createdAt?: number;
    updatedAt?: number;
    productId: number;
    imageUrl: string;
}
class Images extends Model<ImagesInterface> implements ImagesInterface {
    declare id?: number;
    declare createdAt?: number;
    declare updatedAt?: number;
    declare productId: number;
    declare imageUrl: string;
    static associate() {}
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
