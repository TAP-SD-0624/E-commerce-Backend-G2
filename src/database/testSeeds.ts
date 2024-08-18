import { DataTypes, QueryInterface, QueryTypes } from 'sequelize';
export const seedCategories = async () => {
    async (QueryInterface: QueryInterface) => {
        await QueryInterface.bulkInsert('Categories', [
            {
                title: 'HandBags',
                imageUrl: 'url/url',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Watches',
                imageUrl: 'url/url',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Skincare',
                imageUrl: 'url/url',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    };
};
