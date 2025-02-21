import StudentList from '../components/StudentList'
import { Student } from '../models/Student'
import { Faculty } from '../models/Faculty'
import { Program } from '../models/Program'
import { Status } from '../models/Status'
import SearchBar from '../components/SearchBar'
import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import axios from 'axios'
import NavigationBar from '../components/NavigationBar'
import StudentModal from '../components/StudentModal'
interface StudentMainProps {
    students: Student[];
    programs: Program[];
    faculties: Faculty[];
    status: Status[];
    setStudents: (students: Student[]) => void;
}

interface AddModalProps {
    addModalState: boolean;
    programs: Program[];
    faculties: Faculty[];
    status: Status[];
    setAddModalState: (state: boolean) => void;
}

function AddModal(props: AddModalProps): any {

    return (
        <StudentModal
            allPrograms={props.programs}
            allFaculties={props.faculties}
            allStatus={props.status}
            onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.target as HTMLFormElement);
                console.log(data)
                axios
                    .post('http://localhost:3000/students', data, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(() => window.location.reload())
                props.setAddModalState(false);
            }}
            state={props.addModalState}
            setState={props.setAddModalState}
        />
    )
}

function StudentMain(props: StudentMainProps): any {  
    const [addModalState, setAddModalState] = useState(false);
    return (
        <>
            <div className='p-4 bg-white rounded-b-lg flex flex-col gap-4 h-full w-full'>
                <div className='grid grid-cols-12 gap-4 h-10'>
                    <div className='col-span-10 p-0 h-full'>
                        <SearchBar students={props.students} setStudents={props.setStudents}/>
                    </div>
                    <button
                        className='text-white col-span-1 self-end rounded-xl bg-black h-full cursor-pointer hover:bg-zinc-700'
                        onClick={() => setAddModalState(true)}
                    >
                        Add
                    </button>

                    <button
                        className='text-white col-span-1 self-end rounded-xl bg-black h-full cursor-pointer hover:bg-zinc-700'
                        onClick={() => window.location.reload()}
                    >
                        See all
                    </button>
                </div>
                <StudentList
                    students={props.students}
                    allPrograms={props.programs}
                    allFaculties={props.faculties}
                    allStatus={props.status}
                />
            </div>
            <AddModal addModalState={addModalState} programs={props.programs} faculties={props.faculties} status={props.status} setAddModalState={setAddModalState}/>
        </>
    )
}

interface MetadataState {
    programs: Program[];
    faculties: Faculty[];
    status: Status[];
  }

export default function StudentsPage() {
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
        <StudentMain
            students={students}
            setStudents={setStudents}
            programs={metadata.programs}
            faculties={metadata.faculties}
            status={metadata.status}
        />
    )
}