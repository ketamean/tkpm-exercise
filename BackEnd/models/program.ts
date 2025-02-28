import client from '../config/database'
import isNumericString from '../utils/checkNumericString'
export interface IProgram {
    id: number;
    name: string;
}

const Program = {
    getAll: async (): Promise<IProgram[] | []> => {
        const query = 'SELECT * FROM programs;';
        const values: any = []
        const res = await (client.query(query, values))

        return res.rows as IProgram[] | [];
    },

    getIdByname: async (name: string): Promise<number> => {
        if (!name || isNumericString(name)) throw new Error('Invalid program name')

        const query = 'SELECT id FROM programs WHERE name = $1;'
        const values: Array<string> = [name]
        const res = await (client.query(query, values))

        if (res.rows.length > 1) throw new Error('Multiple programs with the same name')

        return res.rows[0].id
    },

    updateProgramNameById: async (id: number, name: string): Promise<IProgram[] | []> => {
        console.log(`name: ${name}`)
        if (!name) throw new Error('Invalid program name')

        const query = 'UPDATE programs SET name = $1 WHERE id = $2 RETURNING *;'
        const values: any = [name, id]
        const res = await (client.query(query, values))

        return res.rows as IProgram[] | [];
    },

    addNewProgram: async (name: string): Promise<IProgram[] | []> => {
        if (!name || isNumericString(name)) throw new Error('Invalid program name')

        const query = 'INSERT INTO programs(id,name) VALUES (DEFAULT,$1) RETURNING *;'
        const values: any = [name]
        const res = await (client.query(query, values))

        return res.rows as IProgram[] | [];
    },

    deleteByName: async (name: string): Promise<IProgram[] | []> => {
        const query = 'DELETE FROM programs WHERE name = $1 RETURNING *;'
        const values: any = [name]
        const res = await (client.query(query, values))

        return res.rows as IProgram[] | [];
    },

    deleteById: async (id: number): Promise<IProgram[] | []> => {
        const query = 'DELETE FROM programs WHERE id = $1 RETURNING *;'
        const values: any = [id]
        const res = await (client.query(query, values))

        return res.rows;
    }
}

export default Program