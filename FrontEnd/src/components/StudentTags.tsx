import { Student } from '../models/Student'
import { Faculty } from '../models/Faculty'
import { Program } from '../models/Program'
import { Status } from '../models/Status'
import editIcon from '../assets/editIcon.svg'
import deleteIcon from '../assets/deleteIcon.svg'
import Modal from 'react-modal'
import { useState } from 'react'
import axios from 'axios'
import StudentModal from './StudentModal'

Modal.setAppElement('#root')

interface StudentTagsProps {
    student: Student;
    allPrograms: Program[];
    allStatus: Status[];
    allFaculties: Faculty[];
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
    
    // return (
    //     <Modal
    //         isOpen={props.updateModalState}
    //         onRequestClose={() => props.setUpdateModalState(false)}
    //         contentLabel='Update student info'
    //         className='w-1/2 h-1/2 fixed top-1/4 left-1/4 focus:outline-none focus:border-none text-black bg-zinc-100 px-8 py-4 rounded-2xl flex flex-col items-center gap-4 relative'
    //     >
    //         <h2>Update</h2>
    //         <form
    //             onSubmit={(e) => {
    //                 e.preventDefault()
    //                 const data = new FormData(e.target as HTMLFormElement)
    //                 console.log(data)
    //                 axios
    //                     .put(`http://localhost:3000/students?id=${props.student.id}`, data, {
    //                         headers: {
    //                             'Content-Type': 'application/json'
    //                         }
    //                     })
    //                     .then(() => window.location.reload())
    //             }}
    //             className='h-auto w-full grid grid-cols-12 gap-x-4 gap-y-3'
    //         >
    //             <label htmlFor="id" className='col-span-2'>Student ID</label>
    //             <input name='id' type="text" defaultValue={props.student.id} className='col-span-2 border-b-1'/>

    //             <label htmlFor="name" className='col-span-2'>Full name</label>
    //             <input name='name' type="text" defaultValue={props.student.name} className='col-span-6 border-b-1' />

    //             <label htmlFor="gender" className='col-span-2'>Gender</label>
    //             <select defaultValue={props.student.gender} name="gender" id="updateGender" className='col-span-2 border-b-1'>
    //                 <option value="" disabled>Choose gender</option>
    //                 <option value="Male">Male</option>
    //                 <option value="Female">Female</option>
    //             </select>

    //             <label htmlFor="dob" className='col-span-2'>Date of birth</label>
    //             <input name='dob' type="date" defaultValue={defaultDOB} className='col-span-3 border-b-1'/>

    //             <label htmlFor="year" className='col-span-1'>Year</label>
    //             <input name='year' type="text" defaultValue={props.student.year} className='col-span-2 border-b-1'  />

    //             <label htmlFor="program" className='col-span-2'>Program</label>
    //             <select defaultValue={props.student.program} name="program" id="program" className='col-span-2 border-b-1'>
    //                 <option value="" disabled>Choose a program</option>
    //                 <option value="CLC">CLC</option>
    //                 <option value="TT">TT</option>
    //             </select>

    //             <label htmlFor="email" className='col-span-2'>Email</label>
    //             <input name='email' type="email" className='col-span-6 border-b-1' defaultValue={props.student.email}/>

    //             <label htmlFor="address" className='col-span-2'>Address</label>
    //             <input name='address' type='text' className='col-span-10 border-b-1' defaultValue={props.student.address}/>

    //             <label htmlFor="status" className='col-span-2'>Status</label>
    //             <select defaultValue={props.student.status} name="status" id="status" className='col-span-2 border-b-1'>
    //                 <option value="" disabled>Choose a status</option>
    //                 <option value="Undergraduate">Undergraduate</option>
    //                 <option value="Graduated">Graduated</option>
    //                 <option value="Dropped">Dropped</option>
    //                 <option value="Pause">Pause</option>
    //             </select>

    //             <label htmlFor="phone" className='col-span-2'>Phone</label>
    //             <input name='phone' type='tel' className='col-span-2 border-b-1' defaultValue={props.student.phone}/>

    //             <label htmlFor="faculty" className='col-span-2'>Faculty</label>
    //             <select defaultValue={props.student.faculty} name="faculty" id="faculty" className='col-span-2 border-b-1'>
    //                 <option value="" disabled>Choose a faculty</option>
    //                 <option value="Tiếng Nhật">Tiếng Nhật</option>
    //                 <option value="Luật">Luật</option>
    //                 <option value="Tiếng Anh thương mại">Tiếng Anh thương mại</option>
    //                 <option value="Tiếng Pháp">Tiếng Pháp</option>
    //             </select>

    //             <div className='col-span-12 flex flex-row justify-center gap-12 items-center pt-8'>
    //                 <button type='button' onClick={() => props.setUpdateModalState(false)} className='text-black bg-zinc-200 h-12 w-24 rounded-xl font-bold cursor-pointer'>Cancel</button>
    //                 <button type='submit' className='text-white bg-green-600 h-12 w-24 rounded-xl font-bold cursor-pointer'>OK</button>
    //             </div>
    //         </form>
    //     </Modal>
    // )
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

export default function StudentTags(props: StudentTagsProps): any {
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
                <td className='h-full w-8 pr-2 cursor-pointer' onClick={() => setUpdateModalState(true)}><img src={editIcon} alt="Update student's info" title="Update student's info" /></td>
                <td className='h-full w-8 pr-2 cursor-pointer' onClick={() => setDeleteModalState(true)}><img src={deleteIcon} alt="Delete student" title="Delete student" /></td>
            </tr>

            <UpdateModal student={props.student} updateModalState={updateModalState} setUpdateModalState={setUpdateModalState} allPrograms={props.allPrograms} allFaculties={props.allFaculties} allStatus={props.allStatus} />

            <DeleteModal deleteModalState={deleteModalState} setDeleteModalState={setDeleteModalState} student={props.student}/>
        </>

    )
}