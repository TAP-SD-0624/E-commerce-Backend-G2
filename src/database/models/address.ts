import sequelize from '../connection';
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
    static associate(){}
}
Address.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique:true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    state:{
        type:DataTypes.STRING,
        allowNull:false
    },
    street:{
        type:DataTypes.STRING,
        allowNull:false  
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false 
    },
    zipcode:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

},{
    modelName:'Address',
    sequelize
});
export default Address;