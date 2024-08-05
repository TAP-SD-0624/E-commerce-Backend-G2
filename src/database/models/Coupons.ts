import { Model, DataTypes } from "sequelize";
import sequelize from '../connection';
interface CouponsInterface {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  uuid: number;
  value: number;
}
class Coupons extends Model<CouponsInterface> implements CouponsInterface {
  declare id?: number;
  declare createdAt?: number;
  declare updatedAt?: number;
  declare uuid: number;
  declare value: number;
  static associate(){}
}
Coupons.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    uuid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    modelName: "Coupons",
    sequelize,
  }
);
export default Coupons;
