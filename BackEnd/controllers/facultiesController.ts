import { Request, Response } from "express";
import facultyModels, { IFaculty } from "../models/faculty";

export default {
    get: async (req: Request, res: Response): Promise<any> => {
        try {
            const data = await facultyModels.getAll();
            return res.status(200).json({faculties: data});
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    post: async (req: Request, res: Response): Promise<any> => {
        try {
            const faculty: IFaculty = req.body;
            const data = await facultyModels.addNewFaculty(faculty.name);
            return res.status(200).json(data);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    put: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query;
            const faculty: IFaculty = req.body;
            const data = await facultyModels.updateFacultyNameById(Number(query.id), faculty.name);
            return res.status(200).json(data);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    }
}