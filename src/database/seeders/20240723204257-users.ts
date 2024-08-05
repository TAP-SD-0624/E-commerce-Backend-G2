'use strict';
//10
//amr

import { DataTypes, QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkInsert('Users', [
            {
                firstName: 'cristiano',
                lastName: 'ronaldo',
                loginId: 1,
                DOB: new Date('1985-02-05'),
                image: 'url/url',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'lionel',
                lastName: 'messi',
                loginId: 2,
                DOB: new Date('1987-01-24'),
                image: 'url/url',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'ronaldo',
                lastName: 'nazaro',
                loginId: 3,
                DOB: new Date('1975-05-15'),
                image: 'url/url',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'super',
                lastName: 'mario',
                loginId: 4,
                DOB: new Date('1983-05-20'),
                image: 'url/url',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'moz',
                lastName: 'qam',
                loginId: 5,
                DOB: new Date('1900-07-05'),
                image: 'url/url',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'mesut',
                lastName: 'ozil',
                loginId: 6,
                DOB: new Date('1985-02-05'),
                image: 'url/url',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Scott',
                lastName: 'fitzgerald',
                loginId: 7,
                DOB: new Date('1940-02-05'),
                image: 'url/url',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'leo',
                lastName: 'tolstoy',
                loginId: 8,
                DOB: new Date('1970-08-07'),
                image: 'url/url',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'joanne',
                lastName: 'rowling',
                loginId: 9,
                DOB: new Date('1965-07-31'),
                image: 'url/url',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'harry',
                lastName: 'potter',
                loginId: 10,
                DOB: new Date('1997-06-26'),
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
