import client from '../config/database'
import isNumericString from '../utils/checkNumericString'
export interface IStatus {
    id: number;
    name: string;
}

const Status = {
    getAll: async (): Promise<IStatus[] | []> => {
        const query = 'SELECT * FROM status;';
        const values: any = []
        const res = await (client.query(query, values))

        return res.rows as IStatus[] | [];
    },

    getIdByName: async (name: string) => {
        if (!name || isNumericString(name)) throw new Error('Invalid status name')

        const query = 'SELECT id FROM status WHERE name = $1;'
        const values: any = [name]
        const res = await (client.query(query, values))

        if (res.rows.length > 1) throw new Error('Multiple status with the same name')

        return res.rows[0].id
    },

    updateStatusNameById: async (id: number, name: string): Promise<IStatus[] | []> => {
        if (!name) throw new Error('Invalid status name')

        const query = 'UPDATE status SET name = $1 WHERE id = $2 RETURNING *;'
        const values: any = [name, id]
        const res = await (client.query(query, values))

        return res.rows as IStatus[] | [];
    },

    addNewStatus: async (name: string): Promise<IStatus[] | []> => {
        if (!name || isNumericString(name)) throw new Error('Invalid status name')

        const query = 'INSERT INTO status(id,name) VALUES (DEFAULT,$1) RETURNING *;'
        const values: any = [name]
        const res = await (client.query(query, values))

        return res.rows as IStatus[] | [];
    },

    deleteById: async (id: number): Promise<IStatus[] | []> => {
        const query = 'DELETE FROM status WHERE id = $1 RETURNING *;'
        const values: any = [id]
        const res = await (client.query(query, values))

        return res.rows as IStatus[] | [];
    }
}

export default Status