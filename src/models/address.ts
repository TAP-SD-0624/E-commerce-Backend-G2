import sequelize from '../config/database';
import { Model, DataTypes} from 'sequelize';

interface AddressInterface{
     id?:number;
     userId:number;
     state:string;
     street:string;
     city:string;
     zipcode:number;
}
class Address extends Model<AddressInterface> implements AddressInterface{
   
    declare id?:number;
    declare userId:number;
    declare state:string;
    declare street:string;
    declare city:string;
    declare zipcode:number;

}
Address.init({
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement: true,
        unique:true
    },
    userId:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    state:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    street:{
        type:DataTypes.STRING(100),
        allowNull:false  
    },
    city:{
        type:DataTypes.STRING(100),
        allowNull:false 
    },
    zipcode:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false
    }

},{
    tableName:'Address',
    sequelize
});
export default Address;