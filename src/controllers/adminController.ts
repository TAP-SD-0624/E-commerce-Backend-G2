import {Request, Response, NextFunction} from 'express';
import {db} from "../database";
import sequelize from "sequelize";

//! most bought items within a period

export const mostBoughtItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {startDate, endDate} = req.query;
        const items = await db.Orders.findAll({
            include: [
                {
                    model: db.Orders,
                    include: [
                        {
                            model: db.Orders,
                            where: {
                                createdAt: {
                                    // [db.sequelize.Op.between]: [startDate, endDate]
                                }
                            }
                        }
                    ]
                }
            ]
        });
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
}