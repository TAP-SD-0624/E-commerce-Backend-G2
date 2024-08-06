import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../connection';
interface CategoriesInterface {
    id?: number;
    title: string;
    image: string;
    createdAt?: number;
    updatedAt?: number;
}

class Categories extends Model<CategoriesInterface> implements CategoriesInterface {
    declare id?: number;
    declare title: string;
    declare image: string;
    declare createdAt?: number;
    declare updatedAt?: number;
    static associate() {}
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
        image: {
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
