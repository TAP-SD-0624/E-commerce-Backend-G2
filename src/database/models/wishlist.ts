import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../connection';

interface WishlistInterface{
    id?:number;
    productId:number;
    userId:number;


}
class Wishlist extends Model<WishlistInterface>implements WishlistInterface{
    declare id?:number;
    declare productId:number;
    declare userId:number;
   
    static associate(){}
}
Wishlist.init({
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
        allowNull:false,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    }
},
    {
        modelName:'Wishlist',
        sequelize});
        export default Wishlist;