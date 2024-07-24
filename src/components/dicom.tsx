import { useEffect } from 'react'
import { LoadImage } from '../hooks/tool'

function Dicom() {
    useEffect(() => {
        LoadImage()
    }, [])

    return (
        <div className="w-[720px] h-[900px] bg-white p-1">
            <div id="content" className="grid justify-center items-center w-full h-full bg-black"></div>
        </div>
    )
}

export default Dicom
