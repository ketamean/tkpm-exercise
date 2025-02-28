import { Student } from '../../models/Student'
import { Faculty } from '../../models/Faculty'
import { Program } from '../../models/Program'
import { Status } from '../../models/Status'
import editIcon from '../../assets/editIcon.svg'
import deleteIcon from '../../assets/deleteIcon.svg'
import Modal from 'react-modal'
import { useState } from 'react'
import axios from 'axios'
import StudentModal from './StudentModal'

Modal.setAppElement('#root')

interface StudentListItemsProps {
    student: Student;
    allPrograms: Program[];
    allStatus: Status[];
    allFaculties: Faculty[];
    allowDelete?: boolean;
    allowEdit?: boolean;
}

interface UpdateModalProps {
    updateModalState: boolean;
    setUpdateModalState: (state: boolean) => void;
    student: Student;
    allPrograms: Program[];
    allStatus: Status[];
    allFaculties: Faculty[];
}

interface DeleteModalProps {
    deleteModalState: boolean;
    setDeleteModalState: (state: boolean) => void;
    student: Student;
}

function UpdateModal(props: UpdateModalProps): any {
    const dob: Date = new Date(props.student.dob)//.toISOString().slice(0,10);
    const defaultDOB: string = new Date(dob.getTime() - dob.getTimezoneOffset() * 60000).toISOString().slice(0,10);
    return (
        <StudentModal 
            onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.target as HTMLFormElement)
                console.log(data)
                axios
                    .put(`http://localhost:3000/students?id=${props.student.id}`, data, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(() => window.location.reload())
            }}
            state={props.updateModalState}
            setState={props.setUpdateModalState}
            allPrograms={props.allPrograms}
            allFaculties={props.allFaculties}
            allStatus={props.allStatus}
            initValue={{...props.student, dob: defaultDOB}}
        />
    )
}

function DeleteModal(props: DeleteModalProps): any {
    return (
        <Modal
            isOpen={props.deleteModalState}
            onRequestClose={() => props.setDeleteModalState(false)}
            contentLabel='Delete student'
            className='w-1/2 h-1/2 fixed top-1/4 left-1/4 focus:outline-none focus:border-none text-black bg-zinc-100 px-8 py-4 rounded-2xl flex flex-col items-center gap-4 justify-center'        
        >
            <h2>Confirm the deletion</h2>
            <p>Are you sure you want to delete this student?</p>
            <form className='flex flex-row justify-center gap-12 items-center pt-8'
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log('Delete student');
                    axios
                        .delete(`http://localhost:3000/students?id=${props.student.id}`)
                        .then(() => window.location.reload())
                }}
            >
                <button type='button' onClick={() => props.setDeleteModalState(false)} className='text-black bg-zinc-200 h-12 w-24 rounded-xl font-bold cursor-pointer'>Cancel</button>
                <button type='submit' className='text-white bg-red-600 h-12 w-24 rounded-xl font-bold cursor-pointer'>OK</button>
            </form>
        </Modal>
    )
}

export default function StudentListItem(props: StudentListItemsProps): any {
    const [updateModalState, setUpdateModalState] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState(false);
    return (
        <>
            <tr className='h-full border-b-1 border-gray-300 overflow-scroll'>
                <td className='text-wrap w-24 pr-4'>{props.student.id}</td>
                <td className='text-wrap w-40 pr-4'>{props.student.name}</td>
                <td className='text-wrap w-30 pr-4'>{props.student.dob}</td>
                <td className='text-wrap w-16 pr-4'>{props.student.gender}</td>
                <td className='text-wrap w-36 pr-4'>{props.student.faculty}</td>
                <td className='text-wrap w-16 pr-4'>{props.student.year}</td>
                <td className='text-wrap w-16 pr-4'>{props.student.program}</td>
                <td className='text-wrap w-48 pr-4'>{props.student.address}</td>
                <td className='text-wrap w-48 pr-4'>{props.student.email}</td>
                <td className='text-wrap w-12 pr-4'>{props.student.phone}</td>
                <td className='text-wrap w-12 pr-4'>{props.student.status}</td>
                {
                    props.allowEdit !== false?
                        (<td className='h-full w-8 pr-2 cursor-pointer' onClick={() => setUpdateModalState(true)}><img src={editIcon} alt="Update student's info" title="Update student's info" /></td>):
                        <></>
                }
                {
                    props.allowDelete !== false?
                        (<td className='h-full w-8 pr-2 cursor-pointer' onClick={() => setDeleteModalState(true)}><img src={deleteIcon} alt="Delete student" title="Delete student" /></td>):
                        <></>
                }
            </tr>
            {
                props.allowEdit !== false?
                    (<UpdateModal student={props.student} updateModalState={updateModalState} setUpdateModalState={setUpdateModalState} allPrograms={props.allPrograms} allFaculties={props.allFaculties} allStatus={props.allStatus} />):
                    <></>
            }

            {
                props.allowDelete !== false?
                    (<DeleteModal deleteModalState={deleteModalState} setDeleteModalState={setDeleteModalState} student={props.student}/>):
                    <></>
            }
        </>
    )
}