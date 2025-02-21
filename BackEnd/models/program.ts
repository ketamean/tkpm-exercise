import client from '../config/database'

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

    updateProgramNameById: async (id: number, name: string): Promise<IProgram[] | []> => {
        if (!name) throw new Error('Invalid program name')

        const query = 'UPDATE programs SET name = $1 WHERE id = $2 RETURNING *;'
        const values: any = [name, id]
        const res = await (client.query(query, values))

        return res.rows as IProgram[] | [];
    },

    addNewProgram: async (name: string): Promise<IProgram[] | []> => {
        if (!name) throw new Error('Invalid program name')

        const query = 'INSERT INTO programs(id,name) VALUES (DEFAULT,$1) RETURNING *;'
        const values: any = [name]
        const res = await (client.query(query, values))

        return res.rows as IProgram[] | [];
    }
}

export default Program