import StudentList from './StudentList'
import { Student } from '../../models/Student'
import { Faculty } from '../../models/Faculty'
import { Program } from '../../models/Program'
import { Status } from '../../models/Status'
import SearchBar from '../../components/SearchBar'
import Modal from 'react-modal'
import { useState, useEffect, ReactElement, FormEvent } from 'react'
import axios from 'axios'
import StudentModal from './StudentModal'

import {processStudentCSV} from '../../utils/processCsv'
import {processStudentJSON} from '../../utils/processJson'

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

function sortStudentCompare(a: Student, b: Student): number {
    return a.id < b.id? -1: 1;
}

function AddModal(props: AddModalProps): ReactElement {
    return (
        <StudentModal
            allPrograms={props.programs}
            allFaculties={props.faculties}
            allStatus={props.status}
            onSubmit={(e: FormEvent) => {
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

interface FileImportExportModalProps {
    state: boolean;
    setState: (s: boolean) => void;
    onSubmit?: (e: FormEvent) => void;
}

function FileImportExportModal(props: FileImportExportModalProps): ReactElement {
    return (
        <Modal
            isOpen={props.state}
            onRequestClose={() => props.setState(false)}
            // contentLabel='File import - export'
            className='w-1/2 h-auto top-1/4 m-auto focus:outline-none focus:border-none text-black bg-zinc-100 px-8 py-4 rounded-2xl flex flex-col gap-y-4'
        >
            <div className='flex flex-col gap-y-4 w-full h-auto'>
                <p className='font-bold text-2xl'>Export</p>
                <div className='flex flex-row gap-x-4 w-full h-auto'>
                    <button
                        className='border-1 border-blue-500 text-blue-500 px-4 py-2 font-semibold rounded-xl cursor-pointer hover:bg-blue-500 hover:text-white'
                        onClick={() => {
                            axios
                                .get('http://localhost:3000/students/')
                                .then(async (response) => {
                                    const students: Array<Student> = response.data.students.sort(sortStudentCompare);
                                    if (students.length === 0) {
                                        alert('No data to export');
                                        return;
                                    }
                                    const header = Object.keys(students[0]).map((head) => String(head)).join(',');
                                    const data = students.map((student) => Object.values(student).map((val) => String(val)).join(',')).join('\n');
                                    
                                    const fileContent = header + '\n' + data
                                    const blob = new Blob([fileContent], { type: 'text/csv' });
                                    const url = URL.createObjectURL(blob);
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.download = 'students.csv';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                    URL.revokeObjectURL(url);

                                })
                                .catch((error) => {
                                    console.error('There was an error exporting the data!', error);
                                });
                        }}
                    >
                        Export to CSV
                    </button>

                    <button
                        className='border-1 border-blue-500 text-blue-500 px-4 py-2 font-semibold rounded-xl cursor-pointer hover:bg-blue-500 hover:text-white'
                        onClick={() => {
                            axios
                                .get('http://localhost:3000/students/')
                                .then(async (response) => {
                                    const students: Array<Student> = response.data.students.sort(sortStudentCompare);
                                    if (students.length === 0) {
                                        alert('No data to export');
                                        return;
                                    }
                                    const fileContent = JSON.stringify(students, null, 2);
                                    const blob = new Blob([fileContent], { type: 'text/json' });
                                    const url = URL.createObjectURL(blob);
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.download = 'students.json';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                    URL.revokeObjectURL(url);

                                })
                                .catch((error) => {
                                    console.error('There was an error exporting the data!', error);
                                });
                        }}
                    >
                        Export to JSON
                    </button>
                </div>
            </div>
            <form className='flex flex-col gap-y-4' onSubmit={props.onSubmit}>
                <p className='font-bold text-2xl'>Import</p>
                <div className='flex flex-row gap-x-4 items-center'>
                    <input name='importfile' id='importfile' type="file" accept='.csv,.json'
                        className='file:text-blue-500 hover:file:text-white file:bg-transparent hover:file:bg-blue-500 file:font-semibold file:py-2 file:px-4 file:rounded-xl file:cursor-pointer file:border-1 file:border-blue-500'
                        // onChange={() => {
                        //     const fileInput = document.querySelector('#importfile') as HTMLInputElement;
                        //     if (fileInput.files) setSelectFileState(fileInput.files.length)
                        // }}
                    />
                    {/* <p>{(() => {
                        if (selectFileState === 0) return 'No file selected'
                        else if (selectFileState === 1) return '1 file selected'
                        else return `${selectFileState} files selected`
                    })()}</p> */}
                    <button type='submit' className='bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 font-semibold rounded-xl cursor-pointer h-12 aspect-square'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-full h-full'><path fill='white' d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
                    </button>
                </div>
                <button type='button' className='text-black bg-zinc-200 h-12 w-24 rounded-xl font-bold cursor-pointer' onClick={() => props.setState(false)}>Close</button>
            </form>
        </Modal>
    )
}

function StudentMain(props: StudentMainProps): any {
    const [addModalState, setAddModalState] = useState<boolean>(false);
    const [fileModalState, setFileModalState] = useState<boolean>(false);
    return (
        <>
            <div className='p-4 bg-white rounded-b-lg flex flex-col gap-4 h-full w-full'>
                <div className='grid grid-cols-12 gap-4 h-10'>
                    <div className='col-span-9 p-0 h-full'>
                        <SearchBar students={props.students} setStudents={props.setStudents}/>
                    </div>

                    <button
                        className='text-white col-span-1 self-end rounded-xl bg-black h-full cursor-pointer hover:bg-zinc-700'
                        onClick={() => setFileModalState(true)}
                    >
                        Import/Export   
                    </button> 
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
            <FileImportExportModal state={fileModalState} setState={setFileModalState}
                onSubmit={async (e: FormEvent) => {
                    e.preventDefault()
                    const form = e.target as HTMLFormElement
                    const fileInput: HTMLInputElement | null = form.querySelector('input[type="file"]') as HTMLInputElement
                    const files: FileList | null = fileInput?.files

                    if (files && files.length > 0) {
                        let students: Student[] = []
                        for (let i = 0; i < files.length; i++) {
                            const file = files[i]
                            const filename = file.name

                            const idxLastDot = filename.lastIndexOf('.');
                            if (idxLastDot === -1) break;

                            const fileExtension = filename.substring(idxLastDot + 1).toLowerCase()
                            if (fileExtension === 'csv') {
                                students = students.concat((await processStudentCSV(file)) as Student[])
                            } else if (fileExtension === 'json') {
                                students = students.concat((await processStudentJSON(filename)) as Student[])
                            } else {
                                alert('Invalid file extension')
                            }
                        }
                        if (students.length === 0) {
                            alert('You added an empty file')
                        } else if (students.length === 1) {
                            axios
                                .post('http://localhost:3000/students', students[0], {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                .then((res) => {
                                    alert(res.data)
                                    window.location.reload()
                                })
                                .catch((err) => {
                                    alert(err)
                                })
                        } else {
                            axios
                                .post('http://localhost:3000/students', JSON.stringify(students), {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                .then(() => window.location.reload())
                                .catch((err) => {
                                    alert(err)
                                })
                        }
                    } else {
                        alert('No file selected')
                    }
                }}
            />
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
            });
            setStudents((res.data.students as Array<Student>).sort(sortStudentCompare));
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