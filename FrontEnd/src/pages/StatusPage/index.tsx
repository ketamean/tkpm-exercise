import { useState, useEffect } from "react";
import { axiosJson } from '../../config/axios'
import { Status } from '../../models/Status'
import StatusModal from '../ProgramsPage/ProgramModal'
// import AbstractList from "../../components/AbstractList";
import StatusList from "./StatusList";

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
            // console.log(data)
            axios
                .post('http://localhost:3000/status', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(() => window.location.reload())
            props.setModalState(false);
        }}
            state={props.modalState}
            setState={props.setModalState}
            // allData={props.allData}
        />
    )
}

export default function StatusPage() {
    const [status, setStatus] = useState<Status[]>([]);
    const [addModalState, setAddModalState] = useState<boolean>(false)
    useEffect(() => {
      try {
        axios
          .get('http://localhost:3000/status')
          .then((res) => {
            console.log(res.data)
            setStatus(res.data.status)
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
                <StatusList allStatus={status}/>
            </div>
            <AddModal modalState={addModalState} setModalState={setAddModalState} allData={status}/>
            
        </>
        // <StudeAddModalntMain
        //     students={students}
        //     setStudents={setStudents}
        //     programs={metadata.programs}
        //     status={metadata.status}
        //     status={metadata.status}
        // />
    )
}