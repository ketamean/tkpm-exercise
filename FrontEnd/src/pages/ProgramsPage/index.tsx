import { useState, useEffect } from "react";
import axios from "axios";
import { Program } from '../../models/Program'
import ProgramModal from './ProgramModal'
import ProgramList from "./ProgramList";
interface AddModalProps {
    allPrograms: Program[];
    modalState: boolean;
    setModalState: (s: boolean) => void;
}
function AddModal(props: AddModalProps) {
    return (
        <ProgramModal
        onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            // console.log(data)
            axios
                .post('http://localhost:3000/programs', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(() => window.location.reload())
            props.setModalState(false);
        }}
            state={props.modalState}
            setState={props.setModalState}
            // allData={props.allPrograms}
        />
    )
}

export default function ProgramsPage() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [addModalState, setAddModalState] = useState<boolean>(false)
    useEffect(() => {
      try {
        axios
          .get('http://localhost:3000/programs')
          .then((res) => {
            setPrograms(res.data.programs)
          })
      } catch (e) {
        console.error(e);
        alert(e);
      }
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
                <ProgramList allPrograms={programs}/>
            </div>
            <AddModal modalState={addModalState} setModalState={setAddModalState} allPrograms={programs}/>
        </>
        // <StudeAddModalntMain
        //     students={students}
        //     setStudents={setStudents}
        //     programs={metadata.programs}
        //     faculties={metadata.faculties}
        //     status={metadata.status}
        // />
    )
}