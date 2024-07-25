import { useContext } from 'react'
import { DicomContext } from '../hooks/context'

function Skill({ value }: { value: string }) {
    const { dispatch } = useContext(DicomContext)

    return (
        <div
            className="text-[#21272A] font-medium px-2 py-3 cursor-pointer"
            onClickCapture={() => {
                dispatch({ type: value, payload: { input: null } })
            }}
        >
            {value}
        </div>
    )
}

export default Skill
