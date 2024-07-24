import { ApplyColormap, FlipH, FlipV, Invert, Reset, RotateDelta30, Zoom } from '../hooks/tool'

function Skill({ value }: { value: string }) {
    return (
        <div
            className="text-[#21272A] font-medium px-2 py-3 cursor-pointer"
            onClick={
                value === 'Zoom'
                    ? Zoom
                    : value === 'Flip H'
                    ? FlipH
                    : value === 'Flip V'
                    ? FlipV
                    : value === 'Rotate Delta 30'
                    ? RotateDelta30
                    : value === 'Invert'
                    ? Invert
                    : value === 'Apply Colormap'
                    ? ApplyColormap
                    : Reset
            }
        >
            {value}
        </div>
    )
}

export default Skill
