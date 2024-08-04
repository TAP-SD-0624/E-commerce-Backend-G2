import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';
interface OrderInterface {
    id?:number;
    productId:number;
    userId:number;
    transactionId:number;
}

class Order extends Model<OrderInterface>implements OrderInterface{
    declare id?:number;
    declare productId:number;
    declare userId:number;
    declare transactionId:number;
}

Order.init({
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
    tableName:"Order",
    modelName:"Order",
    sequelize  
});
export default Order;