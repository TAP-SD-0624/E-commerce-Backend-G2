import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/database';
import User from './userModel';



interface PostAttributes {
    id?: number;
    title: string;
    content: string;
    userId: number;
}

class Post extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public userId!: number;

}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    },
}, {
    sequelize,
    modelName: 'post',
});

export default Post;
