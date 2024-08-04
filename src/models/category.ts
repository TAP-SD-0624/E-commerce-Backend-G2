import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';
interface CategoryInterface{
    id?:number;
    title:string;
    image:string;
}

class Category extends Model<CategoryInterface> implements CategoryInterface{
    declare id?:number;
    declare title:string;
    declare image:string;
}

Category.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:"Category",
    modelName:"Category",
sequelize
});
export default Category;