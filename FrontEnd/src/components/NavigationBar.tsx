export default function NavigationBar() {
    return (
        <div className='w-full h-16 bg-zinc-200 flex flex-row justify-between items-center rounded-lg'>
            <div className='ml-8'>
                <a href="/">
                    <h1 className='text-2xl font-bold'>Student Management</h1>
                </a>
            </div>
            
            <div className='mr-8'>
                <button className='text-white bg-green-600 h-12 w-24 rounded-xl font-bold cursor-pointer'>Add</button>
            </div>
        </div>
    )
}