import { ReactElement } from "react"

interface AbstractListProps {
    thead: ReactElement
    tbody: ReactElement
}

export default function AbstractList(props: AbstractListProps): any {
    return (
        <table className='w-full'>
            <thead>
                <tr className='border-b-1 border-gray-300'>
                    {props.thead}
                </tr>
            </thead>
            <tbody>
                {props.tbody}
            </tbody>
        </table>
    )
}