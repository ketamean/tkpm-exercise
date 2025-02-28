// import { Program } from '../../models/Program'
import { Faculty } from '../../models/Faculty' 
import editIcon from '../../assets/editIcon.svg'
import deleteIcon from '../../assets/deleteIcon.svg'
import Modal from 'react-modal'
import { useState, FormEvent } from 'react'
import axios from 'axios'
import FacultyModal from '../ProgramsPage/ProgramModal'
import AbstractListItem from '../../components/AbstractListItem'

Modal.setAppElement('#root')

interface FacultyListItemProps {
    faculty: Faculty;
    allData: Faculty[];
    allowDelete?: boolean;
    allowEdit?: boolean;
}

interface UpdateModalProps {
    allFaculties: Faculty[];
    modalState: boolean;
    setModalState: (state: boolean) => void;
    currentFaculty: Faculty;
}

interface DeleteModalProps {
    deleteModalState: boolean;
    setDeleteModalState: (state: boolean) => void;
    faculty: Faculty;
}

function UpdateModal(props: UpdateModalProps) {
    return (
        <FacultyModal
            onSubmit={(e: FormEvent) => {
                e.preventDefault
            }}
            state={props.modalState}
            setState={props.setModalState}
            allData={props.allFaculties}
            initValue={props.currentFaculty}
        />
    )
}

function DeleteModal(props: DeleteModalProps): any {
    return (
        <Modal
            isOpen={props.deleteModalState}
            onRequestClose={() => props.setDeleteModalState(false)}
            contentLabel='Delete program'
            className='w-1/2 h-1/2 fixed top-1/4 left-1/4 focus:outline-none focus:border-none text-black bg-zinc-100 px-8 py-4 rounded-2xl flex flex-col items-center gap-4 justify-center'        
        >
            <h2>Confirm the deletion</h2>
            <p>Are you sure you want to delete this program?</p>
            <form className='flex flex-row justify-center gap-12 items-center pt-8'
                onSubmit={(e: FormEvent) => {
                    e.preventDefault();
                    console.log('Delete program');
                    axios
                        .delete(`http://localhost:3000/programs?id=${props.faculty.id}`)
                        .then(() => window.location.reload())
                        .catch(() => window.location.reload())
                }}
            >
                <button type='button' onClick={() => props.setDeleteModalState(false)} className='text-black bg-zinc-200 h-12 w-24 rounded-xl font-bold cursor-pointer'>Cancel</button>
                <button type='submit' className='text-white bg-red-600 h-12 w-24 rounded-xl font-bold cursor-pointer'>OK</button>
            </form>
        </Modal>
    )
}

export default function StudentListItem(props: FacultyListItemProps): any {
    const [updateModalState, setUpdateModalState] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState(false);
    // return (
    //     <>
    //         {
    //             props.allowEdit !== false?
    //                 ():
    //                 <></>
    //         }

    //         {
    //             props.allowDelete !== false?
    //                 (<DeleteModal deleteModalState={deleteModalState} setDeleteModalState={setDeleteModalState}/>):
    //                 <></>
    //         }
    //     </>
    // )
    return (
        <AbstractListItem
            children={
                <tr className='h-full border-b-1 border-gray-300 overflow-scroll'>
                    {/* <td className='text-wrap w-24 pr-4'>{props.program.id}</td> */}
                    <td className='text-wrap w-40 pr-4'>{props.faculty.name}</td>
                    <td className='h-full w-8 pr-2 cursor-pointer' onClick={() => setUpdateModalState(true)}><img src={editIcon} alt="Update program's info" title="Update program's info" /></td>
                    <td className='h-full w-8 pr-2 cursor-pointer' onClick={() => setDeleteModalState(true)}><img src={deleteIcon} alt="Delete student" title="Delete student" /></td>
                </tr>
            }
            updateModal={
                <UpdateModal allFaculties={props.allData} modalState={updateModalState} setModalState={setUpdateModalState} currentFaculty={props.faculty} />
            }
            deleteModal={
                <DeleteModal deleteModalState={deleteModalState} setDeleteModalState={setDeleteModalState} faculty={props.faculty}/>
            }
        />
    )
}