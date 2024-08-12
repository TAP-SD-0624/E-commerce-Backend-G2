'use strict';
//3
import { DataTypes, QueryInterface } from 'sequelize';
import { imagesP } from '../creation';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkInsert(
            'Images',
            imagesP
            //     [
            //     {
            //         productId: 1,
            //         imageUrl: 'url/url',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 1,
            //         imageUrl: 'url/url',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 2,
            //         imageUrl: 'url/url',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 3,
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
//  productId: number;
//  imageUrl: number;
