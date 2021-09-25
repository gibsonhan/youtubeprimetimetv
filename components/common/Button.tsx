import { Button as ButtonInterface } from '@ts/interface/button'

function Button(props: ButtonInterface) {
    const {
        disable,
        handleClick,
        title,
        isVisible,
    } = props

    const handleOnClick = (e: any) => {
        e.preventDefault()
        if (disable) {
            return
        }
        handleClick()
    }

    const baseStyle = 'flex flex-col items-center justify-center h-12 w-48 min-w-min my-4 p-4 rounded-md'
    const activeStyle = 'bg-green-300'
    const disableStyle = 'bg-gray-300'
    const style = baseStyle + ' ' + `${disable ? disableStyle : activeStyle}`

    if (!isVisible) {
        return <></>
    }
    return (
        <div className={style} onClick={handleOnClick}>
            <div>
                {title}
            </div>
        </div>
    )
}

export default Button