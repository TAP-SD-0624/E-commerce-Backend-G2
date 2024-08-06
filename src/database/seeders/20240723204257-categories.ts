'use strict';
//3
import { DataTypes, QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkInsert('Categories', [
            {
                title: 'HandBags',
                image: 'url/url',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Watches',
                image: 'url/url',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Skincare',
                image: 'url/url',
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
//   declare id?: number;
//     declare title: string;
//     declare image: string;
