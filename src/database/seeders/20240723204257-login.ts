'use strict';
//5
//amr
import { DataTypes, QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkInsert('Login', [
            {
                userId: 1,
                email: 'cristiano@what.com',
                phone: '0598001122',
                password: 'P@SSWORD',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 2,
                email: 'lionel@what.com',
                phone: '0598001122',
                password: 'P@SSWORD',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 3,
                email: 'ronaldo@what.com',
                phone: '0598001122',
                password: 'P@SSWORD',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 4,
                email: 'super@what.com',
                phone: '0598001122',
                password: 'P@SSWORD',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 5,
                email: 'moz@what.com',
                phone: '0598001122',
                password: 'P@SSWORD',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 6,
                email: 'mesut@what.com',
                phone: '0598001122',
                password: 'P@SSWORD',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 7,
                email: 'Scott@what.com',
                phone: '0598001122',
                password: 'P@SSWORD',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 8,
                email: 'leo@what.com',
                phone: '0598001122',
                password: 'P@SSWORD',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 9,
                email: 'joanne@what.com',
                phone: '0598001122',
                password: 'P@SSWORD',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 10,
                email: 'harry@what.com',
                phone: '0598001122',
                password: 'P@SSWORD',
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
