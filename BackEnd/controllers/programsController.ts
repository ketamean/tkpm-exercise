import { Request, Response } from "express";
import programModels, { IProgram } from "../models/program";

export default {
    get: async (req: Request, res: Response): Promise<any> => {
        try {
            const data = await programModels.getAll();
            return res.status(200).json({programs: data});
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
            const data = await programModels.updateProgramNameById(Number(query.id), String(query.name));
            return res.status(200).json(data);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    delete: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query;
            const data = await programModels.deleteById(query.id as unknown as number);
            if (data.length === 0) throw new Error('Program not found');
            return res.status(200).json(data);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    }
}