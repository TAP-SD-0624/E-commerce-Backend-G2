'use strict';
// 10
import { DataTypes, QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkInsert('Wishlist', [
            {
                productId: 1,
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 2,
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 3,
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 4,
                userId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 5,
                userId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 6,
                userId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 1,
                userId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 2,
                userId: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 3,
                userId: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 4,
                userId: 5,
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
//  productId: number;
//  userId: number;
