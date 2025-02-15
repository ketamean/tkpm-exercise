import {Student} from '../models/Student'
import StudentTags from './StudentTags'

interface StudentListProps {
    students: Student[];
}

export default function StudentList(props: StudentListProps): any {
    return (
        <table className='w-full'>
            <thead>
                <tr className='border-b-1 border-gray-300'>
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
                </tr>
            </thead>
            <tbody>
                {
                    props.students.map((student: Student) => (
                        <StudentTags student={student} />
                    ))
                }
            </tbody>
 
        </table>
    )
}