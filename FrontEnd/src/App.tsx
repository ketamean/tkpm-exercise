import MainPage from './pages/MainPage'
import { Student } from './models/Student'
import axios from 'axios';
import { useState, useEffect } from 'react';

class StudentImpl implements Student {
  id: string = '';
  name: string = '';
  dob: string = '';
  gender: string = '';
  faculty: string = '';
  year: number = 0;
  program: string = '';
  address: string = '';
  email: string = '';
  phone: string = '';
  status: string = '';

  constructor() {
    this.id = '22127777';
    this.name = 'Truong Nguyen Huynh Thi';
    this.dob = '2000-1-1';
    this.gender = 'Female';
    this.faculty = 'Software Engineering';
    this.year = 2020;
    this.program = 'TT';
    this.address = '123 Main St, Springfield, IL';
    this.email = 'truong@gmail.com';
    this.phone = '1234567890';
    this.status = 'Graduated';
  }
}

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  useEffect(() => {
    try {
      axios
        .get('http://localhost:3000/')
        .then((res) => {
          setStudents(res.data)
        })
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }, []);

  return (
    <div className='w-full h-full flex flex-row p-8 text-black'>
      <MainPage
        students={students}
        setStudents={setStudents}
      />
    </div>

  )
}