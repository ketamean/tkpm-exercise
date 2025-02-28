import { Program } from '../../models/Program'
import AbstractList from '../../components/AbstractList'
import ProgramListItem from './ProgramListItem'
interface ProgramListProps {
    allPrograms: Program[];
}

export default function ProgramList(props: ProgramListProps): any {
    return (
        <AbstractList
            thead={
                <>
                    {/* <td className='w-24 pr-4'>ID</td> */}
                    <td className='w-40 pr-4'>Name</td>
                </>
            }
            tbody={
                <>
                    {
                        props.allPrograms?.map((program: Program) => (
                            <ProgramListItem
                                program={program}
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