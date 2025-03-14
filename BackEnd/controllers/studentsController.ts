import { Request, Response } from "express"
import studentModels, { IStudent } from "../models/student"
import programModels from "../models/program";
import facultyModels from "../models/faculty";
import statusModels from "../models/status";
import isNumericString from "../utils/checkNumericString";


const controller = {
    get: async (req: Request, res: Response): Promise<any> => {
        try {
            const metadata = {
                programs: await programModels.getAll(),
                faculties: await facultyModels.getAll(),
                status: await statusModels.getAll()
            }
            const query = req.query;
            if (Object.keys(query).length === 0) {
                const data = await studentModels.getAll();
                return res.status(200).json({...metadata, students: data});
            }
            // else
            let data: IStudent[] | null = null;
            if (query.faculty) {
                if (data === null)
                    data = await studentModels.getByFacultyName(query.faculty as string);
                else {
                    const tmpRes: IStudent[] = [];
                    (data as IStudent[]).forEach((student: IStudent) => {
                        if (student.faculty === query.faculty)
                            tmpRes.push(student);
                    })
                    data = tmpRes;
                }
            }
            if (query.id) {
                if (data === null)
                    data = await studentModels.getById(query.id as string);
                else {
                    const tmpRes: IStudent[] = [];
                    (data as IStudent[]).forEach((student: IStudent) => {
                        if (student.id === query.id)
                            tmpRes.push(student);
                    })
                    data = tmpRes;
                }
            }
            if (query.name) {
                if (data === null)
                    data = await studentModels.getByName(query.name as string);
                else {
                    const tmpRes: IStudent[] = [];
                    (data as IStudent[]).forEach((student: IStudent) => {
                        if (student.name === query.name)
                            tmpRes.push(student);
                    })
                    data = tmpRes;
                }
            }

            return res.status(200).json({...metadata, students: data});
        } catch (e: any) {
            console.log(`studentsController.get error: ${e}`);
            return res.status(500).json(e.message);
        }
    },

    post: async (req: Request, res: Response): Promise<any> => {
        try {
            let message: string = ''
            if (Array.isArray(req.body)) {
                let countSuccess = 0;
                let countFail = 0;
                const students = req.body;
                students.forEach(async (student) => {
                    student.program = isNumericString(student.program)? student.program : await programModels.getIdByname(student.program as string)
                    student.faculty = isNumericString(student.faculty)? student.faculty : await facultyModels.getIdByName(student.faculty as string)
                    student.status = isNumericString(student.status)? student.status : await statusModels.getIdByName(student.status as string)
                    if ((await studentModels.addNewStudent(student)).length) {
                        countSuccess++;
                    } else {
                        countFail++;
                    }
                })
                message = `Added successfully ${countSuccess}, failed ${countFail}`
            } else {
                const student = req.body;
                student.program = isNumericString(student.program)? student.program : (await programModels.getIdByname(student.program as string))
                student.faculty = isNumericString(student.faculty)? student.faculty : await facultyModels.getIdByName(student.faculty as string);
                student.status = isNumericString(student.status)? student.status : await statusModels.getIdByName(student.status as string);
                (await studentModels.addNewStudent(student)).length? message='Success' : message='Student added failed'
            }
            
            return res.status(200).json(message);
        } catch (e: any) {
            console.log(`studentsController.post error: ${e}`);
            return res.status(500).json(e.message);
        }
    },

    put: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query;
            const student: IStudent = req.body;
            const data = await studentModels.updateStudentById(query.id as string, student);
            return res.status(200).json(data);
        } catch (e: any) {
            console.log(e);
            if (e.message)
                return res.status(500).json(e.message);
            else
                return res.status(500).json(e);
        }
    },

    delete: async (req: Request, res: Response): Promise<any> => {
        try {
            const query = req.query;
            const data = await studentModels.deleteStudentByStudentId(query.id as string);
            return res.status(200).json(data);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },
}

export default controller