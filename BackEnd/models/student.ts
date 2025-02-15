import client from '../config/database'
import verifier from '../utils/verifier'
type TGender = 'Male' | 'Female';
type TProgram = 'CLC' | 'TT';
type TStatus = 'Undergraduate' | 'Graduated' | 'Dropped' | 'Pause';
type TFaculty = 'Luật' | 'Tiếng Anh thương mại' | 'Tiếng Nhật' | 'Tiếng Pháp';

export interface IStudent {
    id: string;
    name: string;
    dob: string; // yyyy-mm-dd
    gender: TGender;
    faculty: TFaculty;
    year: string;
    program: TProgram;
    address: string;
    email: string;
    phone: string;
    status: TStatus;
}

const Student = {
    getAll: async () => {
        const query = 'SELECT * FROM students;';
        const values: any = []
        const res = await (client.query(query, values))

        return res.rows as IStudent[] | [];
    },

    getById: async (id: string) => {
        const query = 'SELECT * FROM students WHERE id = $1;';
        const values: any = [id]
        const res = await (client.query(query, values))

        return res.rows as IStudent[] | [];
    },

    getByName: async (name: string) => {
        const query = 'SELECT * FROM students WHERE name = $1;';
        const values: any = [name]
        const res = await (client.query(query, values))

        return res.rows
    },

    addNewStudent: async (student: IStudent) => {
        if (!verifier.email(student.email) || !verifier.phoneNumber(student.phone)) throw new Error('Invalid format of data: email or phone number');

        const query = 'INSERT INTO students(id, name, dob, gender, faculty, year, program, address, email, phone, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;'
        const values: any = [student.id, student.name, student.dob, student.gender, student.faculty, student.year, student.program, student.address, student.email, student.phone, student.status]
        const res = await (client.query(query, values))
        return res.rows;
    },

    deleteStudentById: async (id: string) => {
        const query = 'DELETE FROM students WHERE id = $1 RETURNING *;'
        const values: any = [id]
        const res = await (client.query(query, values))

        return res.rows;
    },

    updateStudentById: async (id: string, student: IStudent) => {
        if (!verifier.email(student.email) || !verifier.phoneNumber(student.phone)) throw new Error('Invalid format of data: email or phone number');

        let query = `
            UPDATE students
            SET id = $1, name = $2, dob = $3, gender = $4, faculty = $5, year = $6, program = $7, address = $8, email = $9, phone = $10, status = $11
            WHERE id = $12
            RETURNING *;
        `;
        let values = [student.id, student.name, student.dob, student.gender, student.faculty, student.year, student.program, student.address, student.email, student.phone, student.status, id];

        const res = await (client.query(query, values));

        return res.rows;
    }
}

export default Student;