import { Faculty } from '../../models/Faculty'
import AbstractList from '../../components/AbstractList'
import FacultyListItem from './FacultyListItem'
interface FacultyListProps {
    allPrograms: Faculty[];
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
                        props.allPrograms?.map((faculty: Faculty) => (
                            <FacultyListItem
                                faculty={faculty}
                                allData={props.allPrograms}
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