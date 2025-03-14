import { useState } from 'react';
import {handleStudentVerificationPaperwork} from './handler';
import templateContent from './templates/studentVerificationTemplate.md?raw';

export default function ServicePage() {
    const [studentId, setStudentId] = useState('');
    const [purpose, setPurpose] = useState('');
    return (
        <form className='w-1/2 py-4 mx-auto h-full flex flex-col gap-y-4 items-center'
            onSubmit={(e) => {
                e.preventDefault();
                handleStudentVerificationPaperwork(studentId, purpose, templateContent, (e.target as HTMLFormElement).filetype.value);
            }}
        >
            <div className='flex flex-row gap-x-2 w-full'>
                <label className='w-28' htmlFor="studentid">Student ID</label>
                <input className='w-full' type="text" placeholder="Student ID" name="studentid" onChange={(e) => {setStudentId(e.target.value)}}/>
            </div>

            <div className='flex flex-row gap-x-2 w-full'>
                <label className='w-28' htmlFor="purpose">Purpose</label>
                <input className='w-full' type="text" placeholder="Purpose" name="purpose" onChange={(e) => {setPurpose(e.target.value)}}/>
            </div>            

            <div className='flex flex-col gap-y-2 w-full'>
                <h3>File type</h3>
                <div className='flex flex-row gap-x-2'>
                    <input type="radio" id="filetype1" name="filetype" value="md" required/>
                    <label htmlFor="filetype1">Markdown</label>
                </div>

                <div className='flex flex-row gap-x-2'>
                    <input type="radio" id="filetype2" name="filetype" value="html" required/>
                    <label htmlFor="filetype2">HTML</label>
                </div>
            </div>

            <button className='bg-blue-500 w-28 text-white p-2 rounded-xl hover:bg-blue-700'
                type="submit"
            >Button</button>
        </form>
    )
}