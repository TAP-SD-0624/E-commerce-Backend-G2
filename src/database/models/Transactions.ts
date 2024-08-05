import { Model, DataTypes } from "sequelize";
import sequelize from '../connection';
interface TranactionsInterface {
  id?: number;
  userId: number;
  paymentStatus: string;
  shipingStatus: string;
  updatedAt?: Date;
  createdAt?: Date;
}

class Transactions
  extends Model<TranactionsInterface>
  implements TranactionsInterface
{
  declare id?: number;
  declare userId: number;
  declare paymentStatus: string;
  declare shipingStatus: string;
  declare readonly updatedAt?: Date;
  declare readonly createdAt?: Date;
  static associate() {
    // Tranactions
  }
}
Transactions.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    paymentStatus: {
      type: DataTypes.STRING,
    },
    shipingStatus: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
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
    sequelize,
    modelName: "Transactions",
  }
);

export default Transactions;