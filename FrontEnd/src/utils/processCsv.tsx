import {Student} from '../models/Student'

export async function processStudentCSV(filePath: string): Promise<Student[]> {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const csvText = await response.text();
      const lines = csvText.split('\n');
      const headers = lines[0].split(',');
      const students: Student[] = [];
  
      for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',');
        if (currentLine.length === headers.length) {
          const student: any = {};
          for (let j = 0; j < headers.length; j++) {
            const header = headers[j].trim();
            const value = currentLine[j].trim();
  
            switch (header) {
              case 'id':
                student.id = value;
                break;
              case 'name':
                student.name = value;
                break;
              case 'dob':
                student.dob = value;
                break;
              case 'gender':
                student.gender = value;
                break;
              case 'faculty':
                student.faculty = value;
                break;
              case 'year':
                student.year = parseInt(value, 10); // Parse year as a number
                break;
              case 'program':
                student.program = value;
                break;
              case 'address':
                student.address = value;
                break;
              case 'email':
                student.email = value;
                break;
              case 'phone':
                student.phone = value;
                break;
              case 'status':
                student.status = value;
                break;
              default:
                // Handle unexpected headers (optional)
                console.warn(`Unexpected header: ${header}`);
                break;
            }
          }
          students.push(student as Student);
        }
      }
      return students;
    } catch (error) {
      console.error('Error processing student CSV:', error);
      return [];
    }
  }