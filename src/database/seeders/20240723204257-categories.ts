'use strict';
//3
import { DataTypes, QueryInterface } from 'sequelize';
import { categories } from '../creation';
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
