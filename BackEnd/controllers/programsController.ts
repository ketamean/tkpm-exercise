import { Request, Response } from "express";
import programModels, { IProgram } from "../models/program";

export default {
    get: async (req: Request, res: Response): Promise<any> => {
        try {
            const data = await programModels.getAll();
            return res.status(200).json(data);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    post: async (req: Request, res: Response): Promise<any> => {
        try {
            const faculty: IProgram = req.body;
            const data = await programModels.addNewProgram(faculty.name);
            return res.status(200).json(data);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    put: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query;
            const faculty: IProgram = req.body;
            const data = await programModels.updateProgramNameById(Number(query.id), faculty.name);
            return res.status(200).json(data);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    }
}