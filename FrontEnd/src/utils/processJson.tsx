import {Student} from '../models/Student'

export async function processStudentJSON(filePath: string): Promise<Student[] | null> {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
  
      if (!Array.isArray(jsonData)) {
        throw new Error('JSON data is not an array.');
      }
  
      const students: Student[] = jsonData.map((item: any) => {
        if (
          typeof item.id !== 'string' ||
          typeof item.name !== 'string' ||
          typeof item.dob !== 'string' ||
          typeof item.gender !== 'string' ||
          typeof item.faculty !== 'string' ||
          typeof item.year !== 'number' ||
          typeof item.program !== 'string' ||
          typeof item.address !== 'string' ||
          typeof item.email !== 'string' ||
          typeof item.phone !== 'string' ||
          typeof item.status !== 'string'
        ) {
          throw new Error('JSON data has invalid properties.');
        }
        return {
          id: item.id,
          name: item.name,
          dob: item.dob,
          gender: item.gender,
          faculty: item.faculty,
          year: item.year,
          program: item.program,
          address: item.address,
          email: item.email,
          phone: item.phone,
          status: item.status,
        };
      });
  
      return students;
    } catch (error) {
      console.error('Error processing student JSON:', error);
      return null;
    }
  }