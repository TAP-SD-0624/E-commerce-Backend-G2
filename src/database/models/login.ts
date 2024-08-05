import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../connection';
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
    static associate(){}
}
Login.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique:true
    },
    userId:{
        type: DataTypes.INTEGER,
         allowNull:false,
         onUpdate: "CASCADE",
         onDelete: "SET NULL",
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING(100),
        allowNull:false
    }
},{
    modelName:"Login",
    sequelize
});
export default Login