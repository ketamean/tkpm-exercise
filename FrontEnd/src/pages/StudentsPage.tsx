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

import {processStudentCSV} from '../utils/processCsv'
import {processStudentJSON} from '../utils/processJson'
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
                    <div className='col-span-9 p-0 h-full'>
                        <SearchBar students={props.students} setStudents={props.setStudents}/>
                    </div>
   
                    <form
                        className='text-white col-span-1 self-end rounded-xl bg-black h-full cursor-pointer hover:bg-zinc-700'
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const fileInput: HTMLInputElement | null = form.querySelector('input[type="file"]') as HTMLInputElement
                            const files: FileList | null = fileInput?.files

                            if (files && files.length > 0) {
                                const students: Student[] = []
                                for (let i = 0; i < files.length; i++) {
                                    const file = files[i]
                                    const filename = file.name

                                    const idxLastDot = filename.lastIndexOf('.');
                                    const fileExtension = filename.substring(idxLastDot + 1).toLowerCase()
                                    if (idxLastDot === -1) break;
                                    if (fileExtension === 'csv') {
                                        students.concat((await processStudentCSV(filename)) as Student[])
                                    } else if (fileExtension === 'json') {
                                        students.concat((await processStudentJSON(filename)) as Student[])
                                    }
                                }

                                axios
                                    .post('http://localhost:3000/students', students, {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    })
                                    .then(() => window.location.reload())
                                    .catch((err) => {
                                        alert(err)
                                        window.location.reload()
                                    })
                            }
                        }}
                    >
                        <label htmlFor="importfiles">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.2 216H224v80c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-80H94.8c-14.3 0-21.4-17.3-11.3-27.4l96.4-95.7c6.7-6.6 17.4-6.6 24 0l96.4 95.7c10.2 10.1 3 27.4-11.3 27.4zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"/></svg>
                        </label>
                        <input id="importfiles" type="file" />
                    </form>
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