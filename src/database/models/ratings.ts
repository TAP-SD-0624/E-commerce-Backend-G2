import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';
interface RatingsInterface{
    id?:number;
    productId:number;
    userId:number;
    rating:number;
    comments :string;
    review:string;
}

class Ratings extends Model<RatingsInterface> implements RatingsInterface{
    declare id?:number;
    declare productId:number;
    declare userId:number;
    declare rating:number;
    declare comments :string;
    declare  review:string;
    static associate(){}
}
Ratings.init({
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
        type:DataTypes.STRING,
        allowNull:false
    },
    review:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    modelName:"Ratings",
    sequelize
});
export default Ratings;