import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';
interface ProductInterface{
     id?:number;
     detail:string;
     description:string;
     price:number;
     discount: number;
     title: string;
     quantity:number;
     image:string;
     readonly createdAt?: Date;
     readonly updatedAt?: Date;
}
class Product extends Model<ProductInterface> implements ProductInterface{
    declare id?:number;
    declare detail:string;
    declare description:string;
    declare price:number;
    declare discount: number;
    declare title: string;
    declare quantity:number;
    declare image:string;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
}
Product.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique:true,
    },
    detail:{
       type: new DataTypes.STRING,
       allowNull: false
    },
    description:{
        type: new DataTypes.STRING,
        allowNull: false  
    },
    price:{
        type: new DataTypes.INTEGER.UNSIGNED,
        allowNull:false
    },
    discount :{
        type: new DataTypes.INTEGER.UNSIGNED,
        allowNull:false
    },
    title :{
        type: new DataTypes.STRING,
       allowNull: false
    },
    quantity:{
        type: new DataTypes.INTEGER.UNSIGNED,
        allowNull:false
    },
    image:{
        type: new DataTypes.STRING,
       allowNull: false
    }

},{
    tableName: 'Product',
    sequelize
});
export default Product;