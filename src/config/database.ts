import { Sequelize } from 'sequelize';
require('dotenv').config();
import Rating from '../models/Rating';
// import Brands from '../models/brands';
// import Address from '../models/address';
// import Cart from '../models/cart';
// import Category from '../models/category';
// import Coupons from '../models/Coupons';
// import Images from '../models/Images';
// import Login from '../models/login';
// import Order from '../models/orders';
// import Product from '../models/product';
// import ProductsCategories from '../models/ProductsCategories';
// import Tranactions from '../models/Transactions';
// import User from '../models/user';
const sequelize: Sequelize = new Sequelize(
    process.env.DB_NAME ?? 'ep',
    process.env.DB_USER ?? 'root',
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST ?? 'localhost',
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true,
            freezeTableName: true,
        }
    }
);



const testConnection = async (): Promise<boolean> => {
    try {
        await sequelize.authenticate();
        console.log('🔌 Connected to the database.');
        return true;
    } catch (error) {
        console.error('‼️ Unable to connect to the database:', error);
        return false;
    }
};

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('🪢 Database connection established successfully.');
    } catch (error) {
        console.error('‼️ Unable to connect to the database:', error);
        throw error;
    }
};

export default sequelize;