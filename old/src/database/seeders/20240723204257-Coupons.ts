'use strict';
//3
import { v4 as uuidv4 } from 'uuid';
import { DataTypes, QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkInsert('Coupons', [
            {
                id: 1,
                value: 10,
                uuid: uuidv4(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 5,
                value: 5,
                uuid: uuidv4(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 155,
                value: 15,
                uuid: uuidv4(),
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

//  declare;
//  uuid: number;
//  declare;
//  value: number;
