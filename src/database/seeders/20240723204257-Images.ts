'use strict';
//3
import { DataTypes, QueryInterface, QueryTypes } from 'sequelize';
import { imagesP } from '../creation';
import sequelize from '../connection';
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
        await sequelize.query('ALTER SEQUENCE "Images_id_seq" RESTART WITH 61', { type: QueryTypes.RAW });
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
