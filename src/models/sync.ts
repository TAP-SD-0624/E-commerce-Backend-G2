import sequelize from '../config/database';
import User from './userModel';
import Post from './productModel';
import Category from './categoryModel';
import Comment from './commentModel';
import PostCategories from "./postCategoriesModel";
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