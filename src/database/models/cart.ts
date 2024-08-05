import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../connection';
interface CartInterface{
    id?:number;
    userId:number;
    productId:number;
    quantity:number;
}

class Cart extends Model<CartInterface>implements CartInterface{
   declare id?:number;
   declare userId:number;
   declare productId:number;
   declare quantity:number;
   static associate(){}
}
Cart.init({
    id:{
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement: true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    productId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    modelName:"Cart",
    sequelize
});
export default Cart;