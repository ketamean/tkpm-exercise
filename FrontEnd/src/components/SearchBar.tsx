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
                axios
                    .get(`http://localhost:3000?${(e.target as HTMLFormElement).criteria.value}=${(e.target as HTMLFormElement).searchContent.value}`)
                    .then((res) => props.setStudents(res.data))
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