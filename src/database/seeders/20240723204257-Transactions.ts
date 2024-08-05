'use strict';
//amr

import { DataTypes, QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkInsert('Transactions', [
            {
                paymentStatus: 'pending',
                shipingStatus: 'pending',
                userId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                paymentStatus: 'pending',
                shipingStatus: 'pending',
                userId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                paymentStatus: 'pending',
                shipingStatus: 'pending',
                userId: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                paymentStatus: 'pending',
                shipingStatus: 'pending',
                userId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                paymentStatus: 'pending',
                shipingStatus: 'pending',
                userId: 3,
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
