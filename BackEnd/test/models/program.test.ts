import Program from '../../models/program';
import { jest } from '@jest/globals';
import client from '../../config/database';

jest.mock('../../config/database');

describe('Program Model', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get all programs', async () => {
        const mockRows = [{ id: 1, name: 'HOHCLC' }];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Program.getAll();
        expect(result).toEqual(mockRows);
        expect(client.query).toHaveBeenCalledWith('SELECT * FROM programs;', []);
    });

    it('should get program id by name', async () => {
        const mockRows = [{ id: 1 }];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Program.getIdByname('HOHCLC');
        expect(result).toBe(1);
        expect(client.query).toHaveBeenCalledWith('SELECT id FROM programs WHERE name = $1;', ['HOHCLC']);
    });

    it('should throw error if program name is invalid', async () => {
        await expect(Program.getIdByname('123')).rejects.toThrow('Invalid program name');
    });

    it('should throw error if multiple programs have the same name', async () => {
        const mockRows = [{ id: 1 }, { id: 2 }];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        await expect(Program.getIdByname('Duplicate')).rejects.toThrow('Multiple programs with the same name');
    });

    it('should update program name by id', async () => {
        const mockRows = [{ id: 1, name: 'DTVTCLC' }];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Program.updateProgramNameById(1, 'DTVTCLC');
        expect(result).toEqual(mockRows);
        expect(client.query).toHaveBeenCalledWith('UPDATE programs SET name = $1 WHERE id = $2 RETURNING *;', 
            ['DTVTCLC', 1]);
    });

    it('should add new program', async () => {
        const mockRows = [{ id: 1, name: 'CNTN' }];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Program.addNewProgram('CNTN');
        expect(result).toEqual(mockRows);
        expect(client.query).toHaveBeenCalledWith('INSERT INTO programs(id,name) VALUES (DEFAULT,$1) RETURNING *;', 
            ['CNTN']);
    });

    it('should delete program by name', async () => {
        const mockRows = [{ id: 1, name: 'HOHCLC' }];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Program.deleteByName('HOHCLC');
        expect(result).toEqual(mockRows);
        expect(client.query).toHaveBeenCalledWith('DELETE FROM programs WHERE name = $1 RETURNING *;', 
            ['HOHCLC']);
    });

    it('should delete program by id', async () => {
        const mockRows = [{ id: 1, name: 'HOHCLC' }];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Program.deleteById(1);
        expect(result).toEqual(mockRows);
        expect(client.query).toHaveBeenCalledWith('DELETE FROM programs WHERE id = $1 RETURNING *;', [1]);
    });

    it('should throw error when getting program ID with empty name', async () => {
        await expect(Program.getIdByname('')).rejects.toThrow('Invalid program name');
    });
    
    it('should throw error when program not found by name', async () => {
    (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: [] });

    await expect(Program.getIdByname('Non-existent Program')).rejects.toThrow();
    });

    it('should throw error when updating with empty name', async () => {
    await expect(Program.updateProgramNameById(1, '')).rejects.toThrow('Invalid program name');
    });

    it('should throw error when adding program with empty name', async () => {
    await expect(Program.addNewProgram('')).rejects.toThrow('Invalid program name');
    });

    it('should return empty array when deleting non-existent program by name', async () => {
    (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: [] });

    const result = await Program.deleteByName('Non-existent Program');
    expect(result).toEqual([]);
    });

    it('should return empty array when deleting non-existent program by id', async () => {
    (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: [] });

    const result = await Program.deleteById(999);
    expect(result).toEqual([]);
    });
});