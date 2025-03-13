import { useState, useEffect } from "react";
import { Status } from '../../models/Status'
import StatusModal from '../ProgramsPage/ProgramModal'
import StatusList from "./StatusList";
import { fetchStatus, handleAddStatusSubmit } from "./handler";

interface AddModalProps {
    allData: Status[];
    modalState: boolean;
    setModalState: (s: boolean) => void;
}

function AddModal(props: AddModalProps) {
    return (
        <StatusModal
            onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.target as HTMLFormElement);
                handleAddStatusSubmit(data, props.setModalState);
            }}
            state={props.modalState}
            setState={props.setModalState}
        />
    )
}

export default function StatusPage() {
    const [status, setStatus] = useState<Status[]>([]);
    const [addModalState, setAddModalState] = useState<boolean>(false)
    
    useEffect(() => {
        fetchStatus(setStatus);
    }, []);
  
    return (
        <>
            <div className='p-4 bg-white rounded-b-lg flex flex-col gap-4 h-full w-full'>
                <div className='grid grid-cols-12 gap-4 h-10 w-full'>
                    <button
                        className='text-white col-start-11 col-span-1 self-end rounded-xl bg-black h-full cursor-pointer hover:bg-zinc-700'
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
                <StatusList allStatus={status}/>
            </div>
            <AddModal modalState={addModalState} setModalState={setAddModalState} allData={status}/>
        </>
    )
}