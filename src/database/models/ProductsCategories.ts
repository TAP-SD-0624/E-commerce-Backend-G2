import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/database";
interface ProductsCategoriesInterface {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  productId: number;
  categoryId: number;
}
class ProductsCategories
  extends Model<ProductsCategoriesInterface>
  implements ProductsCategoriesInterface
{
  declare id?: number;
  declare createdAt?: number;
  declare updatedAt?: number;
  declare productId: number;
  declare categoryId: number;
  static associate(){}
}
ProductsCategories.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    modelName: "ProductsCategories",
  }
);
export default ProductsCategories;
