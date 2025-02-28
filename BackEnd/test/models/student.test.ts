import Student, { IStudent } from '../../models/student';
import { jest } from '@jest/globals';
import client from '../../config/database';
import verifier from '../../utils/verifier';

jest.mock('../../config/database');
jest.mock('../../utils/verifier');

describe('Student Model', () => {
    // Sample student data for testing
    const mockStudentData: IStudent = {
        id: '22127488',
        name: 'John Doe',
        dob: '2000-01-01',
        gender: 'Male',
        faculty: 1,
        year: '2022',
        program: 1,
        address: '123 Main St',
        email: 'john@example.com',
        phone: '0123456789',
        status: 1
    };

    const mockStudentResponse = {
        id: '22127488',
        name: 'John Doe',
        dob: '2000-01-01',
        gender: 'Male',
        faculty: 'Computer Science',
        year: '2022',
        program: 'CLC',
        address: '123 Main St',
        email: 'john@example.com',
        phone: '0123456789',
        status: 'Undergraduate'
    };

    beforeEach(() => {
        // Setup default mocks for verifier
        (verifier.email as jest.Mock).mockResolvedValue(true);
        (verifier.phoneNumber as jest.Mock).mockResolvedValue(true);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // HAPPY PATH TESTS
    
    it('should get all students', async () => {
        const mockRows = [mockStudentResponse];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Student.getAll();
        expect(result).toEqual(mockRows);
        expect(client.query).toHaveBeenCalledWith(expect.stringContaining('SELECT'), []);
    });

    it('should get student by ID', async () => {
        const mockRows = [mockStudentResponse];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Student.getById('22127488');
        expect(result).toEqual(mockRows);
        expect(client.query).toHaveBeenCalledWith(
            expect.stringContaining('WHERE s.id LIKE $1'),
            ['22127488%']
        );
    });

    it('should get students by faculty name with accent', async () => {
        const mockRows = [mockStudentResponse];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        // Mock isWithAccent to return true
        const result = await Student.getByFacultyName('Điện tử');
        expect(result).toEqual(mockRows);
        expect(client.query).toHaveBeenCalledWith(
            expect.stringContaining('WHERE f.name LIKE $1'),
            ['%Điện tử%']
        );
    });

    it('should get students by faculty name without accent', async () => {
        const mockRows = [mockStudentResponse];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Student.getByFacultyName('Computer Science');
        expect(result).toEqual(mockRows);
        expect(client.query).toHaveBeenCalledWith(
            expect.stringContaining('WHERE unaccent(f.name) ILIKE unaccent($1)'),
            ['%Computer Science%']
        );
    });

    it('should get students by name with accent', async () => {
        const mockRows = [mockStudentResponse];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Student.getByName('Nguyễn');
        expect(result).toEqual(mockRows);
    });

    it('should get students by name without accent', async () => {
        const mockRows = [mockStudentResponse];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Student.getByName('John');
        expect(result).toEqual(mockRows);
    });

    it('should add new student successfully', async () => {
        const mockRows = [mockStudentData];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Student.addNewStudent(mockStudentData);
        expect(result).toEqual(mockRows);
        expect(verifier.email).toHaveBeenCalledWith(mockStudentData.email);
        expect(verifier.phoneNumber).toHaveBeenCalledWith(mockStudentData.phone);
    });

    it('should delete student by ID', async () => {
        const mockRows = [mockStudentData];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Student.deleteStudentById('22127488');
        expect(result).toEqual(mockRows);
        expect(client.query).toHaveBeenCalledWith(
            'DELETE FROM students WHERE id = $1 RETURNING *;',
            ['22127488']
        );
    });

    it('should update student by ID', async () => {
        const mockRows = [mockStudentData];
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: mockRows });

        const result = await Student.updateStudentById('22127488', mockStudentData);
        expect(result).toEqual(mockRows);
        expect(verifier.email).toHaveBeenCalledWith(mockStudentData.email);
        expect(verifier.phoneNumber).toHaveBeenCalledWith(mockStudentData.phone);
    });

    // EDGE CASES

    it('should return empty array when no students exist', async () => {
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: [] });
        
        const result = await Student.getAll();
        expect(result).toEqual([]);
    });

    it('should return empty array when student ID not found', async () => {
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: [] });
        
        const result = await Student.getById('nonexistent');
        expect(result).toEqual([]);
    });

    it('should return empty array when faculty name not found', async () => {
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: [] });
        
        const result = await Student.getByFacultyName('Nonexistent Faculty');
        expect(result).toEqual([]);
    });

    it('should return empty array when student name not found', async () => {
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: [] });
        
        const result = await Student.getByName('Nonexistent Name');
        expect(result).toEqual([]);
    });

    it('should throw error when email format is invalid', async () => {
        (verifier.email as jest.Mock).mockResolvedValue(false);
        
        await expect(Student.addNewStudent(mockStudentData))
            .rejects.toThrow('Invalid format of data: email');
    });

    it('should throw error when phone format is invalid', async () => {
        (verifier.email as jest.Mock).mockResolvedValue(true);
        (verifier.phoneNumber as jest.Mock).mockResolvedValue(false);
        
        await expect(Student.addNewStudent(mockStudentData))
            .rejects.toThrow('Invalid format of data: phone number');
    });

    it('should throw error when database operation fails on add', async () => {
        (client.query as jest.Mock<any>).mockRejectedValueOnce(new Error('Database error'));
        
        await expect(Student.addNewStudent(mockStudentData))
            .rejects.toThrow('Database error');
    });

    it('should return empty array when deleting non-existent student', async () => {
        (client.query as jest.Mock<any>).mockResolvedValueOnce({ rows: [] });
        
        const result = await Student.deleteStudentById('nonexistent');
        expect(result).toEqual([]);
    });

    it('should throw error when email is invalid during update', async () => {
        (verifier.email as jest.Mock).mockResolvedValue(false);
        
        await expect(Student.updateStudentById('22127488', mockStudentData))
            .rejects.toThrow('Invalid format of data: email');
    });
});