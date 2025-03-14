import { Request, Response } from "express"
import studentModels, { IStudent } from "../models/student"
import programModels from "../models/program";
import facultyModels from "../models/faculty";
import statusModels from "../models/status";
import isNumericString from "../utils/checkNumericString";
import { PrimaryExpression } from "typescript";

async function getStudentByConstraint(prevData: IStudent[] | null, constraint: string, getter: (val: any) => Promise<IStudent[] | null>, compare: (student: IStudent, constraint: string) => boolean) {
    let data = prevData
    if (data === null)
        data = await getter(constraint);
    else {
        const tmpRes: IStudent[] = [];
        (data as IStudent[]).forEach((student: IStudent) => {
            if (compare(student, constraint))
                tmpRes.push(student);
        })
        data = tmpRes;
    }

    return data
}

async function getStudentByStudentId(prevData: IStudent[] | null, studentId: string) {
    return await getStudentByConstraint(
        prevData,
        studentId,
        studentModels.getById,
        (student: IStudent, constraint: string) => constraint.includes(student.id)
    )
}

async function getStudentByFacultyName(prevData: IStudent[] | null, facName: string) {
    return await getStudentByConstraint(
        prevData,
        facName,
        studentModels.getByFacultyName,
        (student: IStudent, constraint: string) => constraint.includes(student.faculty as string)
    )
}

async function getStudentByStudentName(prevData: IStudent[] | null, stuName: string) {
    // <!!> case&accent insensitive
    return await getStudentByConstraint(
        prevData,
        stuName,
        studentModels.getByName,
        (student: IStudent, constraint: string) => constraint.includes(student.name)
    )
}

async function postSingleStudent(student: IStudent): Promise<boolean> {
    student.program = isNumericString(student.program as string)? student.program : (await programModels.getIdByname(student.program as string))
    student.faculty = isNumericString(student.faculty as string)? student.faculty : await facultyModels.getIdByName(student.faculty as string);
    student.status = isNumericString(student.status as string)? student.status : await statusModels.getIdByName(student.status as string);
    switch((await studentModels.addNewStudent(student)).length) {
        case 0: return false;
        case 1: return true;
        default: throw new Error('postSingleStudent error: more than 1 student added');
    }
}

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
            if (query.faculty) data = await getStudentByFacultyName(data, query.faculty as string);
            if (query.id) data = await getStudentByStudentId(data, query.id as string);
            if (query.name) data = await getStudentByStudentName(data, query.name as string);

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
                    if (await postSingleStudent(student)) countSuccess++;
                    else countFail++;
                })
                message = `Added successfully ${countSuccess}, failed ${countFail}`
            } else {
                const student = req.body;
                if (await postSingleStudent(student))
                    message = 'Added successfully';
                else
                    message = 'Failed to add student';
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