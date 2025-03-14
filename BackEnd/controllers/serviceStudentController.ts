import { Request, Response } from 'express';
import studentServiceModels, { IStudentVerification } from '../models/serviceStudent';
import studentModels, { IStudent } from '../models/student';

export default {
    getVerificationPaperwork: async (req: Request, res: Response): Promise<any> => {
        try {
            const id = req.query.id?.toString();
            const purpose = req.query.purpose?.toString();
            if (!id || !purpose) return res.status(400).json( {message: 'Missing required fields'} );
            console.log(id, purpose)
            const student: IStudent[] | null = await studentModels.getById(id);
            console.log(student)
            if (!student) {
                throw new Error('Student not found');
            }
            const studentData: IStudent = student[0];
            const exprDate = studentServiceModels.getStudentVerifPpworkExpDate(purpose);
            const grantDate = new Date().toDateString();
            const info: IStudentVerification = {
                name: studentData.name,
                studentId: id as string,
                dob: studentData.dob,
                program: studentData.program.toString(),
                faculty: studentData.faculty.toString(),
                status: studentData.status.toString(),
                enrolmentYear: studentData.year,
                gender: studentData.gender,
                schoolName: 'HCMUS',
    
                purpose: purpose as string,
                exprDate,
                grantDate
            }
            console.log(info)
            return res.status(200).json({ info });
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: e })
        }
    }
}