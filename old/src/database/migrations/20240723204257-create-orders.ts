'use strict';
import { DataTypes, QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.createTable('Orders', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            productId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            transactionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            addressId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
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
        await queryInterface.dropTable('Orders');
    }
};
