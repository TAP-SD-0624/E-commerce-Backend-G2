import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';
interface RatingsInterface {
    id?: number;
    productId: number;
    userId: number;
    rating: number;
    comments: string;
    review: string;
    createdAt?: number;
    updatedAt?: number;
}

class Ratings extends Model<RatingsInterface> implements RatingsInterface {
    declare id?: number;
    declare productId: number;
    declare userId: number;
    declare rating: number;
    declare comments: string;
    declare review: string;
    declare createdAt?: number;
    declare updatedAt?: number;
    static associate() {}
}
Ratings.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: false
        },
        review: {
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
        modelName: 'Ratings',
        sequelize
    }
);
export default Ratings;
