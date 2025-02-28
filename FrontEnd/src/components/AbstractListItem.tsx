import { FormEvent, ReactElement } from "react"

interface AbstractListItemProps {
    children: ReactElement | ReactElement[];
    deleteModal: ReactElement
    updateModal: ReactElement
}

export default function AbstractListItem(props: AbstractListItemProps): ReactElement {
    return (
        <>
            <tr className='border-b-1 border-gray-300'>
                {props.children}
            </tr>
            {props.updateModal}
            {props.deleteModal}
        </>

    )
}