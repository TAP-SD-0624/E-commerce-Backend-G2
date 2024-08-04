import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';
interface loginInterface{
     id?:number;
    userId:number;
     email:string;
     phone:number;
   password:string;
}
class Login extends Model<loginInterface>implements loginInterface{
    declare id?:number;
    declare userId:number;
    declare email:string;
    declare phone:number;
    declare password:string;
}
Login.init({
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement: true,
        unique:true
    },
    userId:{
        type: DataTypes.INTEGER.UNSIGNED,
         allowNull:false,
         onUpdate: "CASCADE",
         onDelete: "SET NULL",
    },
    email:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    phone:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING(100),
        allowNull:false
    }
},{
    tableName:"Login",
    sequelize
});
export default Login