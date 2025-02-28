import { FormEvent } from 'react';
import Modal from 'react-modal'

interface ProgramModalProps {
    onSubmit: (e: FormEvent) => void;
    state: boolean; // open / close
    setState: (state: boolean) => void;
    allData?: Array<{id: string| number, name: string}>;
    initValue?: {id: string | number, name: string};
}
export default function ProgramModal(props: ProgramModalProps): any {
    return (
        <Modal
            isOpen={props.state}
            onRequestClose={() => props.setState(false)}
            contentLabel='Update student info'
            className='w-1/2 h-1/2 fixed top-1/4 left-1/4 focus:outline-none focus:border-none text-black bg-zinc-100 px-8 py-4 rounded-2xl flex flex-col items-center gap-4 relative'
        >
            <h2>Update</h2>
            <form className='h-auto w-full grid grid-cols-12 gap-x-4 gap-y-3'
                onSubmit={props.onSubmit}
            >
                <label htmlFor="name" className='col-span-2'>Name</label>
                <input name='name' type="text" className='col-span-6 border-b-1' defaultValue={props.initValue?.name}/>

                <div className='col-span-12 flex flex-row justify-center gap-12 items-center pt-8'>
                    <button type='button' onClick={() => props.setState(false)} className='text-black bg-zinc-200 h-12 w-24 rounded-xl font-bold cursor-pointer'>Cancel</button>
                    <button
                        type='submit' className='text-white bg-green-600 h-12 w-24 rounded-xl font-bold cursor-pointer'
                    >
                        OK
                    </button>
                </div>
            </form>
        </Modal>
    )
}
