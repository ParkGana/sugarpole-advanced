function Dicom({ value }: { value: string }) {
    return (
        <div className="w-[720px] h-[900px] bg-white p-1">
            <div className="grid justify-center items-center w-full h-full bg-black">
                <img className="max-w-full max-h-full" src={`/images/${value}.png`} />
            </div>
        </div>
    )
}

export default Dicom
