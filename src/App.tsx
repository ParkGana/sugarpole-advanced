import './App.css'
import Dicom from './components/dicom'
import Move from './components/move'
import Skill from './components/skill'

function App() {
    return (
        <div className="grid gap-[34px] p-[34px]">
            <div className="grid grid-cols-[repeat(2,auto)] items-center place-content-between px-[34px]">
                <p className="text-xl text-[#697077] font-bold">Dicom Viewer (with Cornerstone.js)</p>
                <div className="grid grid-cols-[repeat(2,auto)] gap-6">
                    <div className="grid grid-cols-[repeat(7,auto)] items-center gap-4">
                        <Skill value={'Zoom'} />
                        <Skill value={'Flip H'} />
                        <Skill value={'Flip V'} />
                        <Skill value={'Rotate Delta 30'} />
                        <Skill value={'Invert'} />
                        <Skill value={'Apply Colormap'} />
                        <Skill value={'Reset'} />
                    </div>
                    <div className="grid grid-cols-[repeat(2,auto)] gap-6">
                        <Move value={'Previous Image'} />
                        <Move value={'Next Image'} />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 bg-[#0f62fe] border-t-4 border-[#0f62fe] gap-1">
                <Dicom value={'1'} />
                <Dicom value={'2'} />
            </div>
        </div>
    )
}

export default App
