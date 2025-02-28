import { Faculty } from '../../models/Faculty'
import AbstractList from '../../components/AbstractList'
import FacultyListItem from './FacultyListItem'
interface FacultyListProps {
    allFaculty: Faculty[];
}

export default function FacultyList(props: FacultyListProps): any {
    return (
        <AbstractList
            thead={
                <>
                    <td className='w-40 pr-4'>Name</td>
                </>
            }
            tbody={
                <>
                    {
                        props.allFaculty?.map((faculty: Faculty) => (
                            <FacultyListItem
                                faculty={faculty}
                                allData={props.allFaculty}
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