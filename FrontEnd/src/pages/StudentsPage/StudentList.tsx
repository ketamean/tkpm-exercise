import {Student} from '../../models/Student'
import { Faculty } from '../../models/Faculty'
import { Program } from '../../models/Program'
import { Status } from '../../models/Status'
import StudentListItem from './StudentListItem'
import AbstractList from '../../components/AbstractList'
interface StudentListProps {
    students: Student[];
    allPrograms: Program[];
    allStatus: Status[];
    allFaculties: Faculty[];
}

export default function StudentList(props: StudentListProps): any {
    return (
        <AbstractList
            thead={
                <>
                    <td className='w-24 pr-4'>Student ID</td>
                    <td className='w-40 pr-4'>Full name</td>
                    <td className='pr-4'>Date of birth</td>
                    <td className='pr-4'>Gender</td>
                    <td className='pr-4'>Faculty</td>
                    <td className='pr-4'>Year</td>
                    <td className='pr-4'>Program</td>
                    <td className='pr-4'>Address</td>
                    <td className='pr-4'>Email</td>
                    <td className='pr-4'>Phone</td>
                    <td className='pr-4'>Status</td>
                </>
            }
            tbody={
                <>
                    {
                        (() => {
                            console.log(`StudentList: ${Object.keys(props.students)}`)
                            return props.students?
                                (
                                    props.students.map((student: Student) => {
                                        return (
                                        <StudentListItem
                                            student={student}
                                            allPrograms={props.allPrograms}
                                            allFaculties={props.allFaculties}
                                            allStatus={props.allStatus}
                                            allowDelete={true}
                                            allowEdit={true}
                                        />
                                    )})
                                ):
                                <></>
                        })()

                    }
                </>
            }
        />
    )
}