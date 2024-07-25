import { useContext } from 'react'
import { DicomContext } from '../hooks/context'

function Move({ value }: { value: string }) {
    const { dispatch } = useContext(DicomContext)

    return (
        <div
            className="bg-[#0f62fe] text-white font-medium px-7 py-4 cursor-pointer"
            onClickCapture={() => {
                dispatch({ type: value, payload: { input: null } })
            }}
        >
            {value}
        </div>
    )
}

export default Move
