import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../connection';
import Address from './address';
import Ratings from './ratings';
interface UserInterface{
    id ?:number;
    loginId?:number;
    firstName: string;
    lastName:string;
    DOB:number;
    image: string;
}
class Users extends Model<UserInterface>implements UserInterface{
    declare id ?:number;
    declare loginId?:number;
    declare firstName: string;
    declare lastName:string;
    declare DOB :number;
    declare image: string;
    static associate(){
        Users.hasMany(Address,{foreignKey:'userId'})
        Users.hasMany(Ratings,{foreignKey:{name:'userId'}})
    }
}
Users.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique:true
    },
    loginId:{
        type: DataTypes.INTEGER,
        // allowNull: false,
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
    modelName:'Users',
    sequelize
});
export default Users;