'use strict';
//3
import { DataTypes, QueryInterface } from 'sequelize';
import { brands } from '../creation';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkInsert(
            'Brands',
            brands
            //     [
            //     {
            //         name: 'd&g',
            //         imageUrl: 'url/url',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         name: 'Zara',
            //         imageUrl: 'url/url',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         name: 'CHANEL',
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
