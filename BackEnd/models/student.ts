import client from '../config/database'
import verifier from '../utils/verifier'
// type TGender = 'Male' | 'Female';
// type TProgram = 'CLC' | 'TT';
// type TStatus = 'Undergraduate' | 'Graduated' | 'Dropped' | 'Pause';
// type TFaculty = 'Luật' | 'Tiếng Anh thương mại' | 'Tiếng Nhật' | 'Tiếng Pháp';


export interface IStudent {
    id: string;
    name: string;
    dob: string; // yyyy-mm-dd
    gender: string;
    faculty: number | string;
    year: string;
    program: number | string;
    address: string;
    email: string;
    phone: string;
    status: number | string
}

function isWithAccent(str: string): boolean {
    return str.normalize('NFKD').replace(/[\u0300-\u036f]/g, '') != str;
}

const Student = {
    getAll: async () => {
        const query = `
            SELECT s.studentid as id, s.name as name, s.dob as dob, s.gender as gender, f.name as faculty, s.year as year, p.name as program, s.address as address, s.email as email, s.phone as phone, sta.name as status
            FROM students s, faculties f, programs p, status sta
            WHERE s.faculty = f.id AND s.program = p.id AND s.status = sta.id;`;
        const values: any = []
        const res = await (client.query(query, values))

        return res.rows as IStudent[] | [];
    },

    getById: async (id: string) => {
        const query = `
            SELECT s.studentid as id, s.name as name, s.dob as dob, s.gender as gender, f.name as faculty, s.year as year, p.name as program, s.address as address, s.email as email, s.phone as phone, sta.name as status
            FROM students s, faculties f, programs p, status sta
            WHERE s.id LIKE $1 AND s.faculty = f.id AND s.program = p.id AND s.status = sta.id;`;
        const values: any = [`${id}%`]
        const res = await (client.query(query, values))

        return res.rows as IStudent[] | [];
    },

    getByFacultyName: async (fname: string) => {
        let query: string;
        if (isWithAccent(fname)) {
            query = `
                SELECT s.studentid as id, s.name as name, s.dob as dob, s.gender as gender, f.name as faculty, s.year as year, p.name as program, s.address as address, s.email as email, s.phone as phone, sta.name as status
                FROM students s, faculties f, programs p, status sta
                WHERE f.name LIKE $1 AND s.faculty = f.id AND s.program = p.id AND s.status = sta.id;`;
        } else {
            query = `
                SELECT s.studentid as id, s.name as name, s.dob as dob, s.gender as gender, f.name as faculty, s.year as year, p.name as program, s.address as address, s.email as email, s.phone as phone, sta.name as status
                FROM students s, faculties f, programs p, status sta
                WHERE unaccent(f.name) ILIKE unaccent($1) AND s.faculty = f.id AND s.program = p.id AND s.status = sta.id;`;

        }
        const values: any = [
            `%${fname}%`
                // .split(' ')
                // .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                // .join(' ')
        ]
        const res = await (client.query(query, values))

        return res.rows as IStudent[] | [];
    },

    getByName: async (name: string) => {
        let query: string;
        if (isWithAccent(name)) {
            query = `
                SELECT s.studentid as id, s.name as name, s.dob as dob, s.gender as gender, f.name as faculty, s.year as year, p.name as program, s.address as address, s.email as email, s.phone as phone, sta.name as status
                FROM students s, faculties f, programs p, status sta
                WHERE s.name LIKE $1 AND s.faculty = f.id AND s.program = p.id AND s.status = sta.id;`;
        } else {
            query = `
                SELECT s.studentid as id, s.name as name, s.dob as dob, s.gender as gender, f.name as faculty, s.year as year, p.name as program, s.address as address, s.email as email, s.phone as phone, sta.name as status
                FROM students s, faculties f, programs p, status sta
                WHERE unaccent(s.name) ILIKE unaccent($1) AND s.faculty = f.id AND s.program = p.id AND s.status = sta.id;`;
        }
        const values: any = [`%${name}%`]
        const res = await (client.query(query, values))

        return res.rows
    },

    addNewStudent: async (student: IStudent) => {
        if (!(await verifier.email(student.email))) throw new Error('Invalid format of data: email');
        if (!(await verifier.phoneNumber(student.phone))) throw new Error('Invalid format of data: phone number');

        try {
            const query = 'INSERT INTO students(id, studentid, name, dob, gender, faculty, year, program, address, email, phone, status) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;'
            const values: any = [student.id, student.name, student.dob, student.gender, student.faculty, student.year, student.program, student.address, student.email, student.phone, student.status]
            const res = await (client.query(query, values))
            return res.rows;
        } catch (e: any) {
            throw new Error(e.message);
        }

    },

    deleteStudentById: async (id: string) => {
        const query = 'DELETE FROM students WHERE id = $1 RETURNING *;'
        const values: any = [id]
        const res = await (client.query(query, values))

        return res.rows;
    },

    updateStudentById: async (id: string, student: IStudent) => {
        if (!(await verifier.email(student.email))) throw new Error('Invalid format of data: email');
        if (!(await verifier.phoneNumber(student.phone))) throw new Error('Invalid format of data: phone number');
        let query = `
            UPDATE students
            SET studentid = $1, name = $2, dob = $3, gender = $4, faculty = $5, year = $6, program = $7, address = $8, email = $9, phone = $10, status = $11
            WHERE studentid = $12
            RETURNING *;
        `;
        let values = [student.id, student.name, student.dob, student.gender, student.faculty, student.year, student.program, student.address, student.email, student.phone, student.status, id];

        const res = await (client.query(query, values));
        return res.rows;
    }
}

export default Student;