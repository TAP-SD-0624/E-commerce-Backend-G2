import sequelize from '../config/database';
import User from '../models/userModel';

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Sync models
        console.log('User and Post created successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await sequelize.close();
    }
};

seedDatabase();