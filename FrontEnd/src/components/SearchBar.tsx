import searchIcon from '../assets/searchIcon.svg'
import axios from 'axios'
import { Student } from '../models/Student'

interface SearchBarProps {
    students: Student[];
    setStudents: (students: Student[]) => void;
}

export default function SearchBar(props: SearchBarProps): any {
    return (
        <form className="w-full h-full grid grid-cols-12 gap-2 focus:outline-none focus:border-none"
            onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement
                if (!form.criteria.value) {
                    alert('Please choose searching criteria');
                    return;
                }
                // const normalizedStr = (form.searchContent.value as string).normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
                // let searchValue = ''
                // if (form.searchContent.value as string === normalizedStr) {

                // }
                axios
                    .get(`http://localhost:3000/students?${form.criteria.value}=${form.searchContent.value}`)
                    .then((res) => {
                        // console.log(res.data)
                        if (res.data?.students)
                            props.setStudents(res.data.students)
                        else
                            props.setStudents([])
                    })
                    .catch((res) => {
                        console.error(res);
                        alert(res);
                        props.setStudents([])
                    })
            }}
        >
            <select name="criteria" id="searchBy" className="col-span-1">
                <option value="" disabled selected>Search by</option>
                <option value="id">ID</option>
                <option value="name">Name</option>
                <option value="faculty">Faculty</option>
            </select>
            <div className="w-full h-full bg-gray-200 rounded-full col-span-11 relative">
                <input name='searchContent' className="w-full h-full text-nowrap overflow-hidden px-4" placeholder="Enter searching criteria"/>
                <button type='submit' className="absolute right-4 top-3 cursor-pointer">
                    <img src={searchIcon} alt="search" title='search'/>
                </button>
            </div>
        </form>
    )
}