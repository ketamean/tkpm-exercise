import client from '../config/database'

export interface IAdminConfig {
    PhoneNumberPattern: string | null,
    EmailPattern: string | null,
    DeleteStudentSeconds: number | null,
    ApplyFlag: boolean | null,
    StudentStatusPrecedences: number[] | null
}

const adminConfig = {
    getAdminConfig: async (): Promise<IAdminConfig | null> => {
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
            Object.entries(data).forEach(([key, val]: [string, any], idx: number) => {
                if (val === null) return;
                cnt++;
                if (cnt > 1) query += ", ";
                
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
                    default:
                        return
                }
                query += `${key.toLowerCase()} = $${cnt}`
            })
            query += " WHERE ID = 1 RETURNING *;"
            const res = await client.query(query, values);
            return res.rows[0] as IAdminConfig;
        } catch (e) {
            console.log(e)
            return null;
        }
    },

    getInstanceFromObject: (data: {[key: string]: any}): IAdminConfig => {
        return {
            PhoneNumberPattern: data.PhoneNumberPattern || null,
            EmailPattern: data.EmailPattern || null,
            DeleteStudentSeconds: data.DeleteStudentSeconds || null,
            ApplyFlag: typeof data.ApplyFlag === 'boolean'? data.ApplyFlag : null,
            StudentStatusPrecedences: data['StudentStatusPrecedences'] || data['StudentStatusPrecedences'.toLowerCase()] || null
        }
    },

    setAdminConfigField: async (field: string, value: any): Promise<IAdminConfig | null> => {
        try {
            const obj = adminConfig.getInstanceFromObject({});
            if (!Object.keys(obj).includes(field)) throw(Error('Column name not found'));
            const query = `UPDATE adminconfig SET ${field} = $1 WHERE ID = 1 RETURNING *;`
            const values = [value]
            const res = await client.query(query, values);
            return res.rows[0] as IAdminConfig;
        } catch (e) {
            console.log(e)
            return null;
        }
    },
}

export default adminConfig;