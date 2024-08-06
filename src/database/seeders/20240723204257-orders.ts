'use strict';
//10
//amr

import { DataTypes, QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkInsert('Orders', [
            {
                productId: 1,
                userId: 2,
                transactionId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 1,
                userId: 2,
                transactionId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 2,
                userId: 2,
                transactionId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 2,
                userId: 2,
                transactionId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 5,
                userId: 5,
                transactionId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 1,
                userId: 5,
                transactionId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 7,
                userId: 5,
                transactionId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 9,
                userId: 2,
                transactionId: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 8,
                userId: 2,
                transactionId: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 7,
                userId: 3,
                transactionId: 5,
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
