import { ConfigSet } from 'ts-jest';
import adminConfigModel, { IAdminConfig } from '../models/adminConfig'

import { Request, Response } from 'express';

const controllers = {
    get: async (req: Request, res: Response): Promise<any> => {
        try {
            console.info('AdminConfigController.get')
            const data = await adminConfigModel.getAdminConfig();
            if (data === null) throw Error('Error getting admin config');
            return res.status(200).json( { ...data } )
        } catch (e) {
            return res.status(500).json( {message: e } )
        }
    },

    put: async (req: Request, res: Response): Promise<any> => {
        try {
            console.info('AdminConfigController.put')
            const configQuery = adminConfigModel.getInstanceFromObject(req.body);
            await adminConfigModel.setAdminConfig(configQuery)
            return res.status(200).json( {message: 'done' })
        } catch (e) {
            console.log(e)
            return res.status(500).json( {message: `Cannot change admin config: ${e}`, data: adminConfigModel.getAdminConfig()} )
        }
    },

    delete: async (req: Request, res: Response): Promise<any> => {
        try {
            console.info('AdminConfigController.delete')
            const { field } = req.query
            const data = await adminConfigModel.setAdminConfigField(field as string, null);
            if (data === null) throw Error('Error getting admin config');
            data as IAdminConfig
            return res.status(200).json( { ...data } )
        } catch (e) {
            return res.status(500).json( {message: e } )
        }
    }
};

export default controllers;