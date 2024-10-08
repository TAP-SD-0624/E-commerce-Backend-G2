'use strict';
import { DataTypes, QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.createTable('Products', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            brandId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            label: {
                type: new Sequelize.STRING(),
                allowNull: false
            },
            description: {
                type: new Sequelize.STRING(),
                allowNull: false
            },
            price: {
                type: new Sequelize.INTEGER(),
                allowNull: false
            },
            discount: {
                type: new Sequelize.INTEGER(),
                allowNull: true
            },
            title: {
                type: new Sequelize.STRING(),
                allowNull: false
            },
            quantity: {
                type: new Sequelize.INTEGER(),
                allowNull: false
            },
            imageUrl: {
                type: new Sequelize.STRING(),
                allowNull: false
            },
            tags: {
                type: new Sequelize.ARRAY(Sequelize.STRING),
                allowNull: false
            },
            rating: {
                type: new Sequelize.FLOAT(),
                allowNull: false,
                defaultValue: 0
            },
            unitsSold: {
                type: new Sequelize.INTEGER(),
                allowNull: false,
                defaultValue: 0
            },
            totalRatings: {
                type: new Sequelize.INTEGER(),
                allowNull: false,
                defaultValue: 0
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.dropTable('Products');
    }
};
