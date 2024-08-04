import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
interface RatingInterface{
    id?:number;
    productId:number;
    userId:number;
    rating:number;
    comments :string;
    review:string;
}

class Rating extends Model<RatingInterface> implements RatingInterface{
    declare id?:number;
    declare productId:number;
    declare userId:number;
    declare rating:number;
    declare comments :string;
    declare  review:string;

}
Rating.init({
    id:{
        primaryKey:true,
    type:DataTypes.INTEGER,
    autoIncrement: true,
    },
    productId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false ,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    rating:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    comments:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    review:{
        type:DataTypes.STRING(200),
        allowNull:false
    }
},{
    tableName:"Rating",
    sequelize
});
export default Rating;