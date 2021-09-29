import { Button as ButtonInterface } from '@ts/interface/button'
import React from 'react'

const Button = React.forwardRef((props: ButtonInterface, ref: any) => {
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
    const activeStyle = 'bg-green-300 hover:cursor-pointer'
    const disableStyle = 'bg-gray-300 hover:cursor-no-allowed'
    const style = `${baseStyle} ` + `${disable ? disableStyle : activeStyle}`

    if (!isVisible) {
        return <></>
    }
    return (
        <div ref={ref} className={style} onClick={handleOnClick}>
            <div>
                {title}
            </div>
        </div>
    )
})

export default Button