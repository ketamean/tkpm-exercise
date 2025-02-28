import { getAdminConfig, setAdminConfig, configLabels } from '../config/adminConfig/adminConfig'

import { Request, Response } from 'express';

const controllers = {
    get: async (req: Request, res: Response): Promise<any> => {
        try {
            const data = await getAdminConfig();
            configLabels.forEach((label) => {
                switch (label) {
                    case 'phonenumberPattern':
                        data[label] = data[label].toString()
                        break
                    case 'emailPatterns':
                        data[label] = data[label].map((pattern: RegExp) => pattern.toString())
                        break
                    default:
                        data[label] = data[label]
                        break
                }
            })
            return res.status(200).json( { ...data } )
        } catch (e) {
            return res.status(500).json( {message: e } )
        }
    },

    put: async (req: Request, res: Response): Promise<any> => {
        try {
            const q = req.body as {[key: string]: any};
            setAdminConfig(q)
            return res.status(200)
        } catch (e) {
            console.log(e)
            return res.status(500).json( {message: `Cannot change admin config: ${e}`, data: getAdminConfig()} )
        }
    },
}

export default controllers