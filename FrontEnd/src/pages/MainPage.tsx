import StudentList from '../components/StudentList'
import { Student } from '../models/Student'
import { Faculty } from '../models/Faculty'
import { Program } from '../models/Program'
import { Status } from '../models/Status'
import SearchBar from '../components/SearchBar'
import Modal from 'react-modal'
import { useState } from 'react'
import axios from 'axios'
import NavigationBar from '../components/NavigationBar'
interface MainPageProps {
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
        <Modal
            isOpen={props.addModalState}
            onRequestClose={() => props.setAddModalState(false)}
            contentLabel='Update student info'
            className='w-1/2 h-1/2 fixed top-1/4 left-1/4 focus:outline-none focus:border-none text-black bg-zinc-100 px-8 py-4 rounded-2xl flex flex-col items-center gap-4 relative'
        >
            <h2>Update</h2>
            <form className='h-auto w-full grid grid-cols-12 gap-x-4 gap-y-3'
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
            >
                <label htmlFor="id" className='col-span-2'>Student ID</label>
                <input name='id' type="text" className='col-span-2 border-b-1'/>

                <label htmlFor="name" className='col-span-2'>Full name</label>
                <input name='name' type="text" className='col-span-6 border-b-1' />

                <label htmlFor="gender" className='col-span-2'>Gender</label>
                <select name="gender" id="updateGender" className='col-span-2 border-b-1'>
                    <option value="" disabled>Choose gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <label htmlFor="dob" className='col-span-2'>Date of birth</label>
                <input name='dob' type="date" className='col-span-3 border-b-1'/>

                <label htmlFor="year" className='col-span-1'>Year</label>
                <input name='year' type="text" className='col-span-2 border-b-1'  />

                <label htmlFor="program" className='col-span-2'>Program</label>
                <select name="program" id="program" className='col-span-2 border-b-1'>
                    <option value="" disabled>Choose a program</option>
                    {
                        (() => {
                            return props.programs.map((prog: Program) => (
                                <option value={prog.id}>{prog.name}</option>
                            ))
                        })()
                    }
                </select>

                <label htmlFor="email" className='col-span-2'>Email</label>
                <input name='email' type="email" className='col-span-6 border-b-1'/>

                <label htmlFor="address" className='col-span-2'>Address</label>
                <input name='address' type='text' className='col-span-10 border-b-1'/>

                <label htmlFor="status" className='col-span-2'>Status</label>
                <select name="status" id="status" className='col-span-2 border-b-1'>
                    {/* <option value="" disabled>Choose a status</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Dropped">Dropped</option>
                    <option value="Pause">Pause</option> */}
                    {
                        (() => {
                            return props.status.map((status: Status) => (
                                <option value={status.id}>{status.name}</option>
                            ))
                        })()
                    }
                </select>

                <label htmlFor="phone" className='col-span-2'>Phone</label>
                <input name='phone' type='tel' className='col-span-2 border-b-1'/>

                <label htmlFor="faculty" className='col-span-2'>Faculty</label>
                <select name="faculty" id="faculty" className='col-span-2 border-b-1'>
                    <option value="" disabled>Choose a faculty</option>
                    {/* <option value="Tiếng Nhật">Tiếng Nhật</option>
                    <option value="Luật">Luật</option>
                    <option value="Tiếng Anh thương mại">Tiếng Anh thương mại</option>
                    <option value="Tiếng Pháp">Tiếng Pháp</option> */}
                    {
                        (() => {
                            return props.faculties.map((faculty: Status) => (
                                <option value={faculty.id}>{faculty.name}</option>
                            ))
                        })()
                    }
                </select>

                <div className='col-span-12 flex flex-row justify-center gap-12 items-center pt-8'>
                    <button type='button' onClick={() => props.setAddModalState(false)} className='text-black bg-zinc-200 h-12 w-24 rounded-xl font-bold cursor-pointer'>Cancel</button>
                    <button
                        type='submit' className='text-white bg-green-600 h-12 w-24 rounded-xl font-bold cursor-pointer'
                    >
                        OK
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default function MainPage(props: MainPageProps): any {  
    const [addModalState, setAddModalState] = useState(false);
    return (
        <div className='flex flex-col items-center justify-center bg-zinc-200 rounded-lg'>
            <NavigationBar />
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
        </div>
    )
}