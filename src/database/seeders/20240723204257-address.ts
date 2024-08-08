'use strict';
// 5
import { DataTypes, QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkInsert('Address', [
            {
                userId: 1,
                state: 'Palestine',
                street: 'Yafa Street',
                city: 'Nablus',
                mobile: '+970',
                fullName: 'you you you',
                zipcode: 400,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 1,
                state: 'Palestine',
                street: 'Antakia Street',
                mobile: '+970',
                fullName: 'you you you',
                city: 'Jenin',
                zipcode: 204,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 1,
                state: 'Jordan',
                street: 'Rainbow Street',
                mobile: '+970',
                fullName: 'you you you',
                city: 'Amman',
                zipcode: 11814,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 2,
                state: 'Jordan',
                street: 'Al Hashimi Street',
                mobile: '+970',
                fullName: 'you you you',
                city: 'Amman',
                zipcode: 11814,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 2,
                state: 'Jordan',
                street: '36 street',
                mobile: '+970',
                fullName: 'you you you',
                city: 'Zarqa',
                zipcode: 13110,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 4,
                state: 'Egypt',
                street: '6th October Street',
                mobile: '+970',
                fullName: 'you you you',
                city: 'Alexandria',
                zipcode: 13110,
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
//   userId:number;
//      state:string;
//      street:string;
//      city:string;
//      zipcode:number;
