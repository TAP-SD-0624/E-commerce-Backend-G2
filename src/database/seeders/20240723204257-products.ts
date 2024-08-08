'use strict';
//10
//amr

import { DataTypes, QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkInsert('Products', [
            {
                title: 'hand bag',
                label: 'black',
                description: 'leather',
                price: 10,
                discount: 0,
                quantity: 100,
                imageUrl: 'url/url',
                brandId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'backpack',
                label: 'travel',
                description: 'big',
                price: 150,
                discount: 10,
                quantity: 20,
                imageUrl: 'url/url',
                brandId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'sneakers',
                label: 'shoes',
                description: 'sports',
                price: 300,
                discount: 20,
                quantity: 174,
                imageUrl: 'url/url',
                brandId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'jordan',
                label: 'shoes',
                description: 'basketball',
                price: 700,
                discount: 30,
                quantity: 543,
                imageUrl: 'url/url',
                brandId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'airmax',
                label: 'shoes',
                description: 'casual',
                price: 562,
                discount: 7,
                quantity: 255,
                imageUrl: 'url/url',
                brandId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'cowboy Hat',
                label: 'hat',
                description: 'summer',
                price: 15,
                discount: 20,
                quantity: 70,
                imageUrl: 'url/url',
                brandId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'iphone 14',
                label: '14 pro max',
                description: 'brand new',
                price: 333,
                discount: 12,
                quantity: 19,
                imageUrl: 'url/url',
                brandId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'galaxy s23',
                label: 's23 ultra',
                description: 'the new samsung phone',
                price: 332,
                discount: 15,
                quantity: 1010,
                imageUrl: 'url/url',
                brandId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'air pods 3',
                label: 'apple earbuds',
                description: 'noise canceling earbuds',
                price: 520,
                discount: 13,
                quantity: 700,
                imageUrl: 'url/url',
                brandId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'smart tablelamp',
                label: 'usb c',
                description: 'smart wifi table lamp',
                price: 15,
                discount: 7,
                quantity: 5,
                imageUrl: 'url/url',
                brandId: 1,
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
