import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
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
      type: DataTypes.UUIDV4,
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
