import MainPage from './pages/MainPage'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Student } from './models/Student'
import { Faculty } from './models/Faculty'
import { Program } from './models/Program'
import { Status } from './models/Status'

interface MetadataState {
  programs: Program[];
  faculties: Faculty[];
  status: Status[];
}

export default function App() {
  const [metadata, setMetadata] = useState<MetadataState>({programs:[], status: [], faculties: []});
  const [students, setStudents] = useState<Student[]>([]);
  useEffect(() => {
    try {
      axios
        .get('http://localhost:3000/students')
        .then((res) => {
          setMetadata({
            programs: res.data.programs,
            faculties: res.data.faculties,
            status: res.data.status
          })
          setStudents(res.data.students)
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
        programs={metadata.programs}
        faculties={metadata.faculties}
        status={metadata.status}
      />
    </div>

  )
}