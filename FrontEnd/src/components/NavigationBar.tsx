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
                    <a href='/'>Student</a>
                </p>

                <p className="w-30 font-bold flex justify-end">
                    <a href='/'>Faculty</a>
                </p>

                <p className="w-30 font-bold flex justify-end">
                    <a href='/'>Program</a>
                </p>
            </div>
        </div>
    )
}