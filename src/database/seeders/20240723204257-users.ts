'use strict';
//10
//amr

import { DataTypes, QueryInterface, QueryTypes } from 'sequelize';
import { users } from '../creation';
import sequelize from '../connection';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkInsert(
            'Users',
            users
            //      [
            //     {
            //         firstName: 'cristiano',
            //         lastName: 'ronaldo',
            //         email: 'cristian2o@what.com',
            //         phone: '0598001122',
            //         password: 'P@SSWORD',
            //         DOB: new Date('1985-02-05'),
            //         imageUrl: 'url/url',
            //         role: 'admin',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         firstName: 'lionel',
            //         lastName: 'messi',
            //         email: 'cristian3o@what.com',
            //         phone: '0598001122',
            //         password: 'P@SSWORD',
            //         DOB: new Date('1987-01-24'),
            //         imageUrl: 'url/url',
            //         role: 'user',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         firstName: 'ronaldo',
            //         lastName: 'nazaro',
            //         email: 'cristian4o@what.com',
            //         phone: '0598001122',
            //         password: 'P@SSWORD',
            //         DOB: new Date('1975-05-15'),
            //         imageUrl: 'url/url',
            //         role: 'user',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         firstName: 'super',
            //         lastName: 'mario',
            //         email: 'cristia5no@what.com',
            //         phone: '0598001122',
            //         password: 'P@SSWORD',
            //         DOB: new Date('1983-05-20'),
            //         imageUrl: 'url/url',
            //         role: 'user',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         firstName: 'moz',
            //         lastName: 'qam',
            //         email: 'cristia6no@what.com',
            //         phone: '0598001122',
            //         password: 'P@SSWORD',
            //         DOB: new Date('1900-07-05'),
            //         imageUrl: 'url/url',
            //         role: 'user',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         firstName: 'mesut',
            //         lastName: 'ozil',
            //         email: 'cristia7no@what.com',
            //         phone: '0598001122',
            //         password: 'P@SSWORD',
            //         DOB: new Date('1985-02-05'),
            //         imageUrl: 'url/url',
            //         role: 'user',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         firstName: 'Scott',
            //         lastName: 'fitzgerald',
            //         email: 'cristian8o@what.com',
            //         phone: '0598001122',
            //         password: 'P@SSWORD',
            //         DOB: new Date('1940-02-05'),
            //         imageUrl: 'url/url',
            //         role: 'user',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         firstName: 'leo',
            //         lastName: 'tolstoy',
            //         email: 'cristi9ano@what.com',
            //         phone: '0598001122',
            //         password: 'P@SSWORD',
            //         DOB: new Date('1970-08-07'),
            //         imageUrl: 'url/url',
            //         role: 'user',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         firstName: 'joanne',
            //         lastName: 'rowling',
            //         email: 'cristia99no@what.com',
            //         phone: '0598001122',
            //         password: 'P@SSWORD',
            //         DOB: new Date('1965-07-31'),
            //         imageUrl: 'url/url',
            //         role: 'user',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     },
            //     {
            //         firstName: 'harry',
            //         lastName: 'potter',
            //         email: 'cristia77no@what.com',
            //         phone: '0598001122',
            //         password: 'P@SSWORD',
            //         DOB: new Date('1997-06-26'),
            //         imageUrl: 'url/url',
            //         role: 'user',
            //         createdAt: new Date(),
            //         updatedAt: new Date()
            //     }
            // ]
        );
        await sequelize.query('ALTER SEQUENCE "Users_id_seq" RESTART WITH 21', { type: QueryTypes.RAW });
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
