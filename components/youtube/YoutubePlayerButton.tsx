import { AiFillCaretUp, AiFillCaretRight, AiFillCaretDown, AiFillCaretLeft } from "react-icons/ai"

export default function YoutubePlayerButton(props: any) {
    const { type, handleOnClick } = props
    const ReactIcon = {
        top: <AiFillCaretUp />,
        right: <AiFillCaretRight />,
        bottom: <AiFillCaretDown />,
        left: <AiFillCaretLeft />,
    }
    const scale = 'transform scale-100'
    const position = 'flex justify-center items-center z-50'
    const shape = 'h-12 w-12 rounded-lg shadow-md'
    const color = 'bg-yellow-200'
    const opacity = 'opacity-50'
    const hover = 'hover:bg-yellow-300 hover:scale-125 hover:opacity-90'
    const active = 'active:bg-green-200'

    return (
        <div
            className={`${scale} ${position} ${shape} ${color} ${opacity} ${hover} ${active}`}
            onClick={() => handleOnClick()}
        >
            {ReactIcon[type]}
        </div>
    )
}