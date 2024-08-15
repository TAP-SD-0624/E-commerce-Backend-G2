'use strict';
//10
//amr

import { DataTypes, QueryInterface, QueryTypes } from 'sequelize';
import { productCategories } from '../creation';
import sequelize from '../connection';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkInsert(
            'ProductsCategories',
            productCategories
            //     [
            //     {
            //         productId: 1,
            //         categoryId: 2,
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 1,
            //         categoryId: 3,
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 2,
            //         categoryId: 1,
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 6,
            //         categoryId: 2,
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 7,
            //         categoryId: 3,
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 3,
            //         categoryId: 2,
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 4,
            //         categoryId: 2,
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 1,
            //         categoryId: 1,
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     }
            // ]
        );
        await sequelize.query('ALTER SEQUENCE "ProductsCategories_id_seq" RESTART WITH 20', { type: QueryTypes.RAW });
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
