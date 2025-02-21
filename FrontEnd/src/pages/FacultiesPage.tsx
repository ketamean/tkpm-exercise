import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { Program } from '../models/Program'
import ProgramModal from '../components/ProgramModal'
import AbstractList from "../components/AbstractList";
import ProgramListItem from "../components/ProgramListItem";
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
                .post('http://localhost:3000/faculties', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(() => window.location.reload())
            props.setModalState(false);
        }}
            state={props.modalState}
            setState={props.setModalState}
            allPrograms={props.allPrograms}
        />
    )
}

interface ProgramListProps {
    allPrograms: Program[];
}
function ProgramList(props: ProgramListProps) {
    return (
        <AbstractList
            thead={
                <>
                    <td className='w-24 pr-4'>ID</td>
                    <td className='w-40 pr-4'>Names</td>
                </>
            }
            tbody={
                <>
                    {
                        props.allPrograms?.map((program: Program) => (
                            <ProgramListItem
                                program={program}
                                allPrograms={props.allPrograms}
                                allowDelete={false}
                                allowEdit={false}
                            />
                        ))
                    }
                </>
            }
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
            console.log(res)
            setPrograms(res.data.programs)
          })
      } catch (e) {
        console.error(e);
        alert(e);
      }
    }, [programs]);
  
    return (
        <>
            <div className='p-4 bg-white rounded-b-lg flex flex-col gap-4 h-full w-full'>
                <div className='grid grid-cols-12 gap-4 h-10 w-full'>
                    {/* <div className='col-span-10 p-0 h-full'>
                        <SearchBar students={props.students} setStudents={props.setStudents}/>
                    </div> */}
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