import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../connection';
interface BrandsInterface{
    id?:number;
    productId:number;
    name:string;
    image:string;
}
class Brands extends Model<BrandsInterface> implements BrandsInterface{
    declare id?:number;
    declare productId:number;
    declare name:string;
    declare image:string;
    static associate(){}
}
Brands.init({
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
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    modelName:"Brands",
    sequelize
});
export default Brands;