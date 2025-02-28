export default function NavigationBar() {
    return (
        <div className='w-full py-2 px-4 h-16 bg-zinc-200 flex flex-row justify-between items-center rounded-lg'>
            <div className='w-1/3'>
                <a href="/">
                    <h1 className='text-2xl font-bold'>Student Management</h1>
                </a>
            </div>
            
            <div className='w-2/3 h-full flex flex-row justify-end items-center text-xl'>
                <p className="w-30 font-bold flex justify-end">
                    <a href='/students'>Student</a>
                </p>

                <p className="w-30 font-bold flex justify-end">
                    <a href='/faculties'>Faculty</a>
                </p>

                <p className="w-30 font-bold flex justify-end">
                    <a href='/programs'>Program</a>
                </p>

                <p className="w-30 font-bold flex justify-end">
                    <a href='/admin'>Admin</a>
                </p>
            </div>
        </div>
    )
}