import { useContext, useEffect } from 'react'
import { LoadImage } from '../hooks/tool'
import { DicomContext } from '../hooks/context'

function Dicom({ value }: { value: number }) {
    const { state, dispatch } = useContext(DicomContext)

    useEffect(() => {
        LoadImage(value)
    }, [])

    return (
        <div
            className={`w-[720px] h-[900px] ${state.area === value ? 'bg-gray-400' : 'bg-white'} p-2 cursor-pointer`}
            onClickCapture={() => {
                dispatch({ type: 'Change Area', payload: { input: value } })
            }}
        >
            <div id={`content${value}`} className="grid justify-center items-center w-full h-full"></div>
        </div>
    )
}

export default Dicom
