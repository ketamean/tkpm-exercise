import { Status } from '../../models/Status'
import AbstractList from '../../components/AbstractList'
import StatusListItem from './StatusListItem'
interface StatusListProps {
    allStatus: Status[];
}

export default function StatusList(props: StatusListProps): any {
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
                        props.allStatus?.map((status: Status) => (
                            <StatusListItem
                                status={status}
                                allData={props.allStatus}
                            />
                        ))
                    }
                </>
            }
            
        />
    )
}