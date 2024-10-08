'use strict';
//2
//amr

import { DataTypes, QueryInterface, QueryTypes } from 'sequelize';
import { ratings } from '../creation';
import sequelize from '../connection';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkInsert(
            'Ratings',
            ratings
            //      [
            //     {
            //         productId: 1,
            //         userId: 1,
            //         rating: 3,
            //         review: 'newnewnew',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 1,
            //         userId: 2,
            //         rating: 4,
            //         review: 'ok',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 1,
            //         userId: 2,
            //         rating: 5,
            //         review: 'newnewnew',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 2,
            //         userId: 1,
            //         rating: 5,
            //         review: 'newnewnew',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 2,
            //         userId: 2,
            //         rating: 5,
            //         review: 'newnewnew',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 2,
            //         userId: 3,
            //         rating: 5,
            //         review: 'newnewnew',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 6,
            //         userId: 4,
            //         rating: 1,
            //         review: 'newnewnew',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 6,
            //         userId: 3,
            //         rating: 1,
            //         review: 'newnewnew',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 7,
            //         userId: 2,
            //         rating: 5,
            //         review: 'newnewnew',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 7,
            //         userId: 4,
            //         rating: 5,
            //         review: 'newnewnew',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 7,
            //         userId: 7,
            //         rating: 5,
            //         review: 'newnewnew',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 6,
            //         userId: 2,
            //         rating: 3,
            //         review: 'newnewnew',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         productId: 6,
            //         userId: 1,
            //         rating: 2,
            //         review: 'newnewnew',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     }
            // ]
        );
        await sequelize.query('ALTER SEQUENCE "Ratings_id_seq" RESTART WITH 61', { type: QueryTypes.RAW });
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
