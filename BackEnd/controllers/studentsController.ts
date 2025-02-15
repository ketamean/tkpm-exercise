import { Request, Response } from "express"
import studentModels, { IStudent } from "../models/student"
const controller = {
    get: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query;
            if (Object.keys(query).length === 0) {
                const data = await studentModels.getAll();
                return res.status(200).json(data);
            }
            // else
            if (query.id) {
                const data = await studentModels.getById(query.id as string);
                return res.status(200).json(data);
            }
            if (query.name) {
                const data = await studentModels.getByName(query.name as string);
                return res.status(200).json(data);
            }
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    post: async (req: Request, res: Response): Promise<any> => {
        try {
            console.log(req.body);
            const student: IStudent = req.body;
            const data = await studentModels.addNewStudent(student);
            return res.status(200).json(data);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    put: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query;
            const student: IStudent = req.body;
            const data = await studentModels.updateStudentById(query.id as string, student);
            return res.status(200).json(data);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },

    delete: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query;
            const data = await studentModels.deleteStudentById(query.id as string);
            return res.status(200).json(data);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },
}

export default controller