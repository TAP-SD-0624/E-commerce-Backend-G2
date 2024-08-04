import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';
interface UserInterface{
    id ?:number;
    loginId:number;
    firstName: string;
    lastName:string;
    DOB:number;
    image: string;
}
class User extends Model<UserInterface>implements UserInterface{
    declare id ?:number;
    declare loginId:number;
    declare firstName: string;
    declare lastName:string;
    declare DOB :number;
    declare image: string;
}
User.init({
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement: true,
        unique:true
    },
    loginId:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    firstName:{
        type: new DataTypes.STRING,
       allowNull: false
    },
    lastName:{
        type: new DataTypes.STRING,
       allowNull: false
    },
    DOB:{
      type:DataTypes.DATE,
      allowNull:false
    },
    image:{
        type :DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:'User',
    sequelize
});
export default User;