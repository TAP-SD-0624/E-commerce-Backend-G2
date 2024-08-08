'use strict';
//2
import { DataTypes, QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkInsert('Cart', [
            {
                userId: 1,
                productId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 1,
                productId: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            },

            {
                userId: 3,
                productId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },

            {
                userId: 4,
                productId: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
