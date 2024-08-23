'use strict';
import { DataTypes, QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.createTable('Cart', {
            id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            productId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            quantityOrdered: {
                type: Sequelize.INTEGER,
                allowNull: true
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
        await queryInterface.dropTable('Cart');
    }
};
