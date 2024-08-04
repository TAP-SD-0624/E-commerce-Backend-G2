import sequelize from '../config/database';
// import User from './userModel';
// import Category from './categoryModel';
// import Comment from './commentModel';
// import PostCategories from "./postCategoriesModel";

import Rating from '../models/Rating';
import Brands from '../models/brands';
import Address from '../models/address';
import Cart from '../models/cart';
import Category from '../models/category';
import Coupons from '../models/Coupons';
import Images from '../models/Images';
import Login from '../models/login';
import Order from '../models/orders';
import Product from '../models/product';
import ProductsCategories from '../models/ProductsCategories';
import Tranactions from '../models/Transactions';
import User from '../models/user';
import {QueryInterface} from "sequelize";



const syncDatabase = async (): Promise<void> => {
    try {
        console.log('Database synced successfully.');

        const queryInterface: QueryInterface = sequelize.getQueryInterface();
        const tables: string[] = await queryInterface.showAllTables();
        console.log('📊 Tables in the database:', tables);
    } catch (error) {
        console.error('‼️ Error syncing database:', error);
    }
};

export default syncDatabase;