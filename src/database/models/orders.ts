import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../connection';
interface OrderInterface {
    id?:number;
    productId:number;
    userId:number;
    transactionId:number;
}

class Orders extends Model<OrderInterface>implements OrderInterface{
    declare id?:number;
    declare productId:number;
    declare userId:number;
    declare transactionId:number;
    static associate(){}

}

Orders.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
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
    },
    transactionId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    }
},{
    modelName:"Orders",
    sequelize  
});
export default Orders;