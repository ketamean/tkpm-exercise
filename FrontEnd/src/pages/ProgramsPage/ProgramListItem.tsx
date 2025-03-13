import { Program } from '../../models/Program'
import editIcon from '../../assets/editIcon.svg'
import deleteIcon from '../../assets/deleteIcon.svg'
import Modal from 'react-modal'
import { useState, FormEvent } from 'react'
import { axiosJson } from '../../config/axios'
import ProgramModal from './ProgramModal'
import AbstractListItem from '../../components/AbstractListItem'

Modal.setAppElement('#root')

interface ProgramListItemProps {
    program: Program;
    allData: Program[];
    allowDelete?: boolean;
    allowEdit?: boolean;
}

interface UpdateModalProps {
    allPrograms: Program[];
    modalState: boolean;
    setModalState: (state: boolean) => void;
    currentProgram: Program;
}

interface DeleteModalProps {
    deleteModalState: boolean;
    setDeleteModalState: (state: boolean) => void;
    program: Program;
}

function UpdateModal(props: UpdateModalProps) {
    return (
        <ProgramModal
            onSubmit={(e: FormEvent) => {
                e.preventDefault()
                axios
                    .put(`http://localhost:3000/programs?id=${props.currentProgram.id}&name=${((e.target as HTMLFormElement).querySelector('input[name=name]') as HTMLInputElement).value}`)
                    .then(() => window.location.reload())
                    .catch((err) => {
                        alert(err.message)
                        props.setModalState(false)
                    })
            }}
            state={props.modalState}
            setState={props.setModalState}
            // allData={props.allPrograms}
            initValue={props.currentProgram}
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
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log('Delete program');
                    axios
                        .delete(`http://localhost:3000/programs?id=${props.program.id}`)
                        .then(() => window.location.reload())
                        .catch((e) => {
                            console.error(e)
                            alert(e)
                            props.setDeleteModalState(false)
                        })
                }}
            >
                <button type='button' onClick={() => props.setDeleteModalState(false)} className='text-black bg-zinc-200 h-12 w-24 rounded-xl font-bold cursor-pointer'>Cancel</button>
                <button type='submit' className='text-white bg-red-600 h-12 w-24 rounded-xl font-bold cursor-pointer'>OK</button>
            </form>
        </Modal>
    )
}

export default function ProgramListItem(props: ProgramListItemProps): any {
    const [updateModalState, setUpdateModalState] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState(false);
    return (
        // <>
        //     <tr className='h-full border-b-1 border-gray-300 overflow-scroll'>
        //     </tr>
        //     
        //     
        // </>
        <AbstractListItem
            children={
                <>
                    {/* <td className='text-wrap w-24 pr-4'>{props.program.id}</td> */}
                    <td className='text-wrap w-full pr-4'>{props.program.name}</td>
                    <td className='h-full pr-2 cursor-pointer' onClick={() => setUpdateModalState(true)}><img src={editIcon} alt="Update program's info" title="Update program's info" /></td>
                    <td className='h-full pr-2 cursor-pointer' onClick={() => setDeleteModalState(true)}><img src={deleteIcon} alt="Delete student" title="Delete student" /></td>
                </>
            }
            updateModal={<UpdateModal allPrograms={props.allData} modalState={updateModalState} setModalState={setUpdateModalState} currentProgram={props.program} />}
            deleteModal={<DeleteModal deleteModalState={deleteModalState} setDeleteModalState={setDeleteModalState} program={props.program}/>}
        />
    )
}