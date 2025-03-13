import client from '../config/database'

export interface IAdminConfig {
    PhoneNumberPattern: string | null,
    EmailPattern: string | null,
    DeleteStudentSeconds: number | null,
    ApplyFlag: boolean | null,
    StudentStatusPrecedences: number[] | null
}

export default {
    getAdminConfig: async (): Promise<IAdminConfig | null> => {
        console.info('Getting admin config')
        try {
            const query = `
                SELECT phonenumberpattern, emailpattern, deletestudentseconds, applyflag, studentstatusprecedences
                FROM adminconfig
                WHERE id = 1;
            `
            const res = await client.query(query)
            return {
                PhoneNumberPattern: res.rows[0].phonenumberpattern,
                EmailPattern: res.rows[0].emailpattern,
                DeleteStudentSeconds: res.rows[0].deletestudentseconds,
                ApplyFlag: res.rows[0].applyflag,
                StudentStatusPrecedences: res.rows[0].studentstatusprecedences,
            } as IAdminConfig;
        } catch (e) {
            console.log(e)
            return null;
        }
    },

    setAdminConfig: async (data: IAdminConfig): Promise<IAdminConfig | null> => {
        try {
            const values: any[] = []
            // let query = "INSERT INTO adminConfig(ID"
            let query = "UPDATE adminconfig SET "
            let cnt = 0;
            console.log(data)
            Object.entries(data).forEach(([key, val]: [string, any], idx: number) => {
                if (val === null) return;
                cnt++;
                if (cnt > 1) query += ", ";
                query += `${key.toLowerCase()} = $${cnt}`
                switch (key) {
                    case 'PhoneNumberPattern':
                        values.push(data.PhoneNumberPattern)
                        break
                    case 'EmailPattern':
                        values.push(data.EmailPattern)
                        break
                    case 'DeleteStudentSeconds':
                        values.push(data.DeleteStudentSeconds)
                        break
                    case 'ApplyFlag':
                        values.push(data.ApplyFlag)
                        break
                    case 'StudentStatusPrecedences':
                        values.push(data.StudentStatusPrecedences)
                        break
                }
            })
            query += " WHERE ID = 1 RETURNING *;"
            console.log(query, values);
            const res = await client.query(query, values);
            return res.rows[0] as IAdminConfig;
        } catch (e) {
            console.log(e)
            return null;
        }
    },

    setAdminConfigField: async (field: string, value: any): Promise<IAdminConfig | null> => {
        try {
            const query = `UPDATE adminconfig SET $1 = $2 WHERE ID = 1 RETURNING *;`
            const res = await client.query(query, [field, value])
            return res.rows[0] as IAdminConfig;
        } catch (e) {
            console.log(e)
            return null;
        }
    },

    getInstanceFromObject: (data: {[key: string]: any}): IAdminConfig => {
        return {
            PhoneNumberPattern: data['PhoneNumberPattern'] || data['PhoneNumberPattern'.toLowerCase()] || null,
            EmailPattern: data['EmailPattern'] || data['EmailPattern'.toLowerCase()] || null,
            DeleteStudentSeconds: data['DeleteStudentSeconds'] || data['DeleteStudentSeconds'.toLowerCase()] || null,
            ApplyFlag: data['ApplyFlag'] || data['ApplyFlag'.toLowerCase()] || null,
            StudentStatusPrecedences: data['StudentStatusPrecedences'] || data['StudentStatusPrecedences'.toLowerCase()] || null
        }
    }
}