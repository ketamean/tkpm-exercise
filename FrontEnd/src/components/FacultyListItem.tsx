import { Program } from '../models/Program'
import editIcon from '../assets/editIcon.svg'
// import deleteIcon from '../assets/deleteIcon.svg'
import Modal from 'react-modal'
import { useState, FormEvent } from 'react'
import axios from 'axios'
import ProgramModal from '../components/ProgramModal'

Modal.setAppElement('#root')

interface ProgramListItemProps {
    program: Program;
    allPrograms: Program[];
    allowDelete?: boolean;
    allowEdit?: boolean;
}

interface UpdateModalProps {
    allPrograms: Program[];
    modalState: boolean;
    setModalState: (state: boolean) => void;
    currentProgram: Program;
}

// interface DeleteModalProps {
//     deleteModalState: boolean;
//     setDeleteModalState: (state: boolean) => void;
//     program: Program;
// }

function UpdateModal(props: UpdateModalProps) {
    return (
        <ProgramModal
            onSubmit={(e: FormEvent) => {
                e.preventDefault
            }}
            state={props.modalState}
            setState={props.setModalState}
            allPrograms={props.allPrograms}
            initValue={props.currentProgram}
        />
    )
}

// function DeleteModal(props: DeleteModalProps): any {
//     return (
//         <Modal
//             isOpen={props.deleteModalState}
//             onRequestClose={() => props.setDeleteModalState(false)}
//             contentLabel='Delete program'
//             className='w-1/2 h-1/2 fixed top-1/4 left-1/4 focus:outline-none focus:border-none text-black bg-zinc-100 px-8 py-4 rounded-2xl flex flex-col items-center gap-4 justify-center'        
//         >
//             <h2>Confirm the deletion</h2>
//             <p>Are you sure you want to delete this program?</p>
//             <form className='flex flex-row justify-center gap-12 items-center pt-8'
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                     console.log('Delete program');
//                     axios
//                         .delete(`http://localhost:3000/programs?id=${props.program.id}`)
//                         .then(() => window.location.reload())
//                         .catch(() => window.location.reload())
//                 }}
//             >
//                 <button type='button' onClick={() => props.setDeleteModalState(false)} className='text-black bg-zinc-200 h-12 w-24 rounded-xl font-bold cursor-pointer'>Cancel</button>
//                 <button type='submit' className='text-white bg-red-600 h-12 w-24 rounded-xl font-bold cursor-pointer'>OK</button>
//             </form>
//         </Modal>
//     )
// }

export default function StudentListItem(props: ProgramListItemProps): any {
    const [updateModalState, setUpdateModalState] = useState(false);
    // const [deleteModalState, setDeleteModalState] = useState(false);
    return (
        <>
            <tr className='h-full border-b-1 border-gray-300 overflow-scroll'>
                <td className='text-wrap w-24 pr-4'>{props.program.id}</td>
                <td className='text-wrap w-40 pr-4'>{props.program.name}</td>
                {
                    props.allowEdit !== false?
                        (<td className='h-full w-8 pr-2 cursor-pointer' onClick={() => setUpdateModalState(true)}><img src={editIcon} alt="Update program's info" title="Update program's info" /></td>):
                        <></>
                }
                {/* {
                    props.allowDelete !== false?
                        (<td className='h-full w-8 pr-2 cursor-pointer' onClick={() => setDeleteModalState(true)}><img src={deleteIcon} alt="Delete student" title="Delete student" /></td>):
                        <></>
                } */}
            </tr>
            {
                props.allowEdit !== false?
                    (<UpdateModal allPrograms={props.allPrograms} modalState={updateModalState} setModalState={setUpdateModalState} currentProgram={props.program} />):
                    <></>
            }

            {/* {
                props.allowDelete !== false?
                    (<DeleteModal deleteModalState={deleteModalState} setDeleteModalState={setDeleteModalState} student={props.student}/>):
                    <></>
            } */}
        </>
    )
}