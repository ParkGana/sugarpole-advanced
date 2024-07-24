import { NextImage, PreviousImage } from '../hooks/tool'

function Move({ value }: { value: string }) {
    return (
        <div
            className="bg-[#0f62fe] text-white font-medium px-7 py-4 cursor-pointer"
            onClick={value === 'Previous Image' ? PreviousImage : NextImage}
        >
            {value}
        </div>
    )
}

export default Move
