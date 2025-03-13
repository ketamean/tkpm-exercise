// Update imports to use the handlers from handler.tsx
import { Status } from '../../models/Status' 
import editIcon from '../../assets/editIcon.svg'
import deleteIcon from '../../assets/deleteIcon.svg'
import Modal from 'react-modal'
import { useState, FormEvent } from 'react'
import StatusModal from '../ProgramsPage/ProgramModal'
import AbstractListItem from '../../components/AbstractListItem'
import { handleUpdateStatusSubmit, handleDeleteStatusSubmit } from './handler'

Modal.setAppElement('#root')

interface StatusListItemProps {
    status: Status;
    allData: Status[];
    allowDelete?: boolean;
    allowEdit?: boolean;
}

interface UpdateModalProps {
    allStatus: Status[];
    modalState: boolean;
    setModalState: (state: boolean) => void;
    currentStatus: Status;
}

interface DeleteModalProps {
    deleteModalState: boolean;
    setDeleteModalState: (state: boolean) => void;
    status: Status;
}

function UpdateModal(props: UpdateModalProps) {
    return (
        <StatusModal
            onSubmit={(e: FormEvent) => {
                e.preventDefault()
                handleUpdateStatusSubmit(e, props.currentStatus.id, props.setModalState)
            }}
            state={props.modalState}
            setState={props.setModalState}
            // allData={props.allStatus}
            initValue={props.currentStatus}
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
                    handleDeleteStatusSubmit(e, props.status.id)
                }}
            >
                <button type='button' onClick={() => props.setDeleteModalState(false)} className='text-black bg-zinc-200 h-12 w-24 rounded-xl font-bold cursor-pointer'>Cancel</button>
                <button type='submit' className='text-white bg-red-600 h-12 w-24 rounded-xl font-bold cursor-pointer'>OK</button>
            </form>
        </Modal>
    )
}

export default function StatusListItem(props: StatusListItemProps): any {
    const [updateModalState, setUpdateModalState] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState(false);

    return (
        <AbstractListItem
            children={
                // <tr className='h-full border-b-1 border-gray-300 overflow-scroll'>
                // </tr>
                <>
                    {/* <td className='text-wrap w-24 pr-4'>{props.program.id}</td> */}
                    <td className='text-wrap w-full pr-4'>{props.status.name}</td>
                    <td className='h-full pr-2 cursor-pointer' onClick={() => setUpdateModalState(true)}><img src={editIcon} alt="Update program's info" title="Update program's info" /></td>
                    <td className='h-full pr-2 cursor-pointer' onClick={() => setDeleteModalState(true)}><img src={deleteIcon} alt="Delete student" title="Delete student" /></td>
                </>
                
            }
            updateModal={
                <UpdateModal allStatus={props.allData} modalState={updateModalState} setModalState={setUpdateModalState} currentStatus={props.status} />
            }
            deleteModal={
                <DeleteModal deleteModalState={deleteModalState} setDeleteModalState={setDeleteModalState} status={props.status}/>
            }
        />
    )
}