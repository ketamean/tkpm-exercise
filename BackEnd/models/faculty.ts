import client from '../config/database'
import isNumericString from '../utils/checkNumericString'
export interface IFaculty {
    id: number;
    name: string;
}

const Faculty = {
    getAll: async () => {
        const query = 'SELECT * FROM faculties;';
        const values: any = []
        const res = await (client.query(query, values))

        return res.rows as IFaculty[] | [];
    },

    getIdByName: async (name: string): Promise<number> => {
        if (!name || isNumericString(name)) throw new Error('Invalid faculty name')

        const query = 'SELECT id FROM faculties WHERE name = $1;'
        const values: any = [name]
        const res = await (client.query(query, values))

        if (res.rows.length > 1) throw new Error('Multiple faculties with the same name')

        return res.rows[0].id
    },

    updateFacultyNameById: async (id: number, name: string) => {
        if (!name) throw new Error('Invalid faculty name')

        const query = 'UPDATE faculties SET name = $1 WHERE id = $2 RETURNING *;'
        const values: any = [name, id]
        const res = await (client.query(query, values))

        return res.rows;
    },

    addNewFaculty: async (name: string) => {
        if (!name || isNumericString(name)) throw new Error('Invalid faculty name')

        const query = 'INSERT INTO faculties(id,name) VALUES (DEFAULT,$1) RETURNING *;'
        const values: any = [name]
        const res = await (client.query(query, values))

        return res.rows;
    }
}

export default Faculty