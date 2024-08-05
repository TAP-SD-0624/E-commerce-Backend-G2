'use strict';
//10
//amr

import { DataTypes, QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkInsert('ProductsCategories', [
            {
                productId: 1,
                categoryId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 1,
                categoryId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 2,
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 6,
                categoryId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 7,
                categoryId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 3,
                categoryId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 4,
                categoryId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 1,
                categoryId: 1,
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
