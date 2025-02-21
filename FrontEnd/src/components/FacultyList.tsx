import { Program } from '../models/Program'
import AbstractList from './AbstractList'
import FacultyListItem from './FacultyListItem'
interface FacultyListProps {
    allPrograms: Program[];
}

export default function FacultyList(props: FacultyListProps): any {
    return (
        <AbstractList
            thead={
                <>
                    <td className='w-24 pr-4'>ID</td>
                    <td className='w-40 pr-4'>Name</td>
                </>
            }
            tbody={
                <>
                    {
                        props.allPrograms?.map((program: Program) => (
                            <FacultyListItem
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