import { FormEvent } from 'react';
import { Student } from '../../models/Student'
import { Faculty } from '../../models/Faculty'
import { Program } from '../../models/Program'
import { Status } from '../../models/Status'
import Modal from 'react-modal'
interface StudentModal {
    onSubmit: (e: FormEvent) => void;
    state: boolean; // open / close
    setState: (state: boolean) => void;
    allPrograms: Program[];
    allStatus: Status[];
    allFaculties: Faculty[];
    initValue?: Student;
}
export default function StudentModal(props: StudentModal): any {
    return (
        <Modal
            isOpen={props.state}
            onRequestClose={() => props.setState(false)}
            contentLabel='Update student info'
            className='w-1/2 h-1/2 fixed top-1/4 left-1/4 focus:outline-none focus:border-none text-black bg-zinc-100 px-8 py-4 rounded-2xl flex flex-col items-center gap-4 relative'
        >
            <h2>Update</h2>
            <form className='h-auto w-full grid grid-cols-12 gap-x-4 gap-y-3'
                onSubmit={props.onSubmit}
            >
                <label htmlFor="id" className='col-span-2'>Student ID</label>
                <input name='id' type="text" className='col-span-2 border-b-1' defaultValue={props.initValue?.id}/>

                <label htmlFor="name" className='col-span-2'>Full name</label>
                <input name='name' type="text" className='col-span-6 border-b-1' defaultValue={props.initValue?.name}/>

                <label htmlFor="gender" className='col-span-2'>Gender</label>
                <select defaultValue={props.initValue?.gender} name="gender" id="updateGender" className='col-span-2 border-b-1'>
                    <option value="" disabled>Choose gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <label htmlFor="dob" className='col-span-2'>Date of birth</label>
                {
                    (() => {
                        try {
                            return <input defaultValue={props.initValue?.dob} name='dob' type="date" className='col-span-3 border-b-1'/>
                        } catch (e) {
                            return <input name='dob' type="date" className='col-span-3 border-b-1'/>
                        }
                    })()
                }
                

                <label htmlFor="year" className='col-span-1'>Year</label>
                <input defaultValue={props.initValue?.year} name='year' type="text" className='col-span-2 border-b-1'  />

                <label htmlFor="program" className='col-span-2'>Program</label>
                <select
                    defaultValue={
                        (() => {
                            if (props.initValue?.program) {
                                for (let i = 0; i < props.allPrograms.length; i++) {
                                    if (props.allPrograms[i].name === props.initValue?.program) return props.allPrograms[i].id
                                }
                            }
                            return undefined
                        })()
                    }
                    name="program" id="program" className='col-span-2 border-b-1'>
                    <option value="" disabled>Choose a program</option>
                    {
                        (() => {
                            return props.allPrograms.map((prog: Program) => (
                                <option value={prog.id}>{prog.name}</option>
                            ))
                        })()
                    }
                </select>

                <label htmlFor="email" className='col-span-2'>Email</label>
                <input defaultValue={props.initValue?.email} name='email' type="email" className='col-span-6 border-b-1'/>

                <label htmlFor="address" className='col-span-2'>Address</label>
                <input defaultValue={props.initValue?.address} name='address' type='text' className='col-span-10 border-b-1'/>

                <label htmlFor="status" className='col-span-2'>Status</label>
                <select
                    defaultValue={
                        (() => {
                            if (props.initValue?.status) {
                                for (let i = 0; i < props.allStatus.length; i++) {
                                    if (props.allStatus[i].name === props.initValue?.status) return props.allStatus[i].id
                                }
                            }
                            return undefined
                        })()
                    }
                    name="status" id="status" className='col-span-2 border-b-1'
                >
                    {
                        (() => {
                            return props.allStatus.map((status: Status) => (
                                <option value={status.id}>{status.name}</option>
                            ))
                        })()
                    }
                </select>

                <label htmlFor="phone" className='col-span-2'>Phone</label>
                <input defaultValue={props.initValue?.phone} name='phone' type='tel' className='col-span-2 border-b-1'/>

                <label htmlFor="faculty" className='col-span-2'>Faculty</label>
                <select
                    defaultValue={
                        (() => {
                            if (props.initValue?.faculty) {
                                for (let i = 0; i < props.allFaculties.length; i++) {
                                    if (props.allFaculties[i].name === props.initValue?.faculty) return props.allFaculties[i].id
                                }
                            }
                            return undefined
                        })()
                    }
                    name="faculty" id="faculty" className='col-span-2 border-b-1'
                >
                    <option value="" disabled>Choose a faculty</option>
                    {/* <option value="Tiếng Nhật">Tiếng Nhật</option>
                    <option value="Luật">Luật</option>
                    <option value="Tiếng Anh thương mại">Tiếng Anh thương mại</option>
                    <option value="Tiếng Pháp">Tiếng Pháp</option> */}
                    {
                        (() => {
                            return props.allFaculties.map((faculty: Status) => (
                                <option value={faculty.id}>{faculty.name}</option>
                            ))
                        })()
                    }
                </select>

                <div className='col-span-12 flex flex-row justify-center gap-12 items-center pt-8'>
                    <button type='button' onClick={() => props.setState(false)} className='text-black bg-zinc-200 h-12 w-24 rounded-xl font-bold cursor-pointer'>Cancel</button>
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
