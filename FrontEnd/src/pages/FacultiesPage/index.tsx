import { useState, useEffect } from "react";
import { axiosJson } from '../../config/axios'
import { Faculty } from '../../models/Faculty'
import FacultyModal from '../ProgramsPage/ProgramModal'
// import AbstractList from "../../components/AbstractList";
import FacultyList from "./FacultyList";

interface AddModalProps {
    allData: Faculty[];
    modalState: boolean;
    setModalState: (s: boolean) => void;
}
function AddModal(props: AddModalProps) {
    return (
        <FacultyModal
        onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            // console.log(data)
            axiosJson
                .post('/faculties', data)
                .then(() => window.location.reload());
            props.setModalState(false);
        }}
            state={props.modalState}
            setState={props.setModalState}
            // allData={props.allData}
        />
    )
}

export default function FacultiesPage() {
    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const [addModalState, setAddModalState] = useState<boolean>(false)
    useEffect(() => {
      try {
        axiosJson
          .get('/faculties')
          .then((res) => {
            setFaculties(res.data.faculties)
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
                <FacultyList allFaculty={faculties}/>
            </div>
            <AddModal modalState={addModalState} setModalState={setAddModalState} allData={faculties}/>
            
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