import Faculty from '../../models/faculty';
import { jest } from '@jest/globals';
import client from '../../config/database';

jest.mock('../../config/database');

describe('Faculty Model', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get all faculties', async () => {
        const mockRows = [{ id: 1, name: 'Luật' }];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Faculty.getAll();
        expect(result).toEqual(mockRows);
        expect(client.query).toHaveBeenCalledWith('SELECT * FROM faculties;', []);
    });

    it('should get faculty id by name', async () => {
        const mockRows = [{ id: 1 }];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Faculty.getIdByName('Luật');
        expect(result).toBe(1);
        expect(client.query).toHaveBeenCalledWith('SELECT id FROM faculties WHERE name = $1;', ['Luật']);
    });

    it('should update faculty name by id', async () => {
        const mockRows = [{ id: 1, name: 'Điện tử viễn thông' }];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Faculty.updateFacultyNameById(1, 'Điện tử viễn thông');
        expect(result).toEqual(mockRows);
        expect(client.query).toHaveBeenCalledWith('UPDATE faculties SET name = $1 WHERE id = $2 RETURNING *;', ['Điện tử viễn thông', 1]);
    });

    it('should add new faculty', async () => {
        const mockRows = [{ id: 1, name: 'Khoa học giáo dục' }];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Faculty.addNewFaculty('Khoa học giáo dục');
        expect(result).toEqual(mockRows);
        expect(client.query).toHaveBeenCalledWith('INSERT INTO faculties(id,name) VALUES (DEFAULT,$1) RETURNING *;', ['Khoa học giáo dục']);
    });

    it('should delete faculty by id', async () => {
        const mockRows = [{ id: 1, name: 'Luật' }];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Faculty.deleteById(1);
        expect(result).toEqual(mockRows);
        expect(client.query).toHaveBeenCalledWith('DELETE FROM faculties WHERE id = $1 RETURNING *;', [1]);
    });
    
    it('should return empty array when no faculties exist', async () => {
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: [] });
        
        const result = await Faculty.getAll();
        expect(result).toEqual([]);
    });

    it('should throw error if faculty name is invalid', async () => {
        await expect(Faculty.getIdByName('123')).rejects.toThrow('Invalid faculty name');
    });
    
    it('should throw error if faculty name is empty', async () => {
        await expect(Faculty.getIdByName('')).rejects.toThrow('Invalid faculty name');
    });

    it('should throw error if multiple faculties have the same name', async () => {
        const mockRows = [{ id: 1 }, { id: 2 }];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        await expect(Faculty.getIdByName('Duplicate')).rejects.toThrow('Multiple faculties with the same name');
    });

    it('should throw error if faculty is not found by name', async () => {
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: [] });
        
        await expect(Faculty.getIdByName('NonExistent')).rejects.toThrow();
    });

    it('should throw error when updating with empty faculty name', async () => {
        await expect(Faculty.updateFacultyNameById(1, '')).rejects.toThrow('Invalid faculty name');
    });

    it('should throw error when adding faculty with empty name', async () => {
        await expect(Faculty.addNewFaculty('')).rejects.toThrow('Invalid faculty name');
    });

    it('should return empty array when deleting non-existent faculty', async () => {
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: [] });
        
        const result = await Faculty.deleteById(999);
        expect(result).toEqual([]);
    });
});