import { Request, Response } from "express";
import statusModels, { IStatus } from "../models/status";

export default {
    get: async (req: Request, res: Response): Promise<any> => {
        try {
            const data = await statusModels.getAll();
            return res.status(200).json({status: data});
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    post: async (req: Request, res: Response): Promise<any> => {
        try {
            const faculty: IStatus = req.body;
            const data = await statusModels.addNewStatus(faculty.name);
            return res.status(200).json(data);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    put: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query;
            const faculty: IStatus = req.body;
            const data = await statusModels.updateStatusNameById(Number(query.id), faculty.name);
            return res.status(200).json(data);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    }
}