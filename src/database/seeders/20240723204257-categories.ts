'use strict';
//3
import { DataTypes, QueryInterface, QueryTypes } from 'sequelize';
import { categories } from '../creation';
import sequelize from '../connection';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkInsert(
            'Categories',
            categories
            //     [
            //     {
            //         title: 'HandBags',
            //         imageUrl: 'url/url',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         title: 'Watches',
            //         imageUrl: 'url/url',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         title: 'Skincare',
            //         imageUrl: 'url/url',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     }
            // ]
        );
        await sequelize.query('ALTER SEQUENCE "Categories_id_seq" RESTART WITH 5', { type: QueryTypes.RAW });
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
//   declare id?: number;
//     declare title: string;
//     declare imageUrl: string;
