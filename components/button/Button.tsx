function Button(props: any) {
    const { disable, handleClick, title, isVisible } = props

    const handleOnClick = (e: any) => {
        e.preventDefault()
        if (disable) {
            return
        }
        handleClick()
    }

    const baseStyle = 'flex justify-center items-center h-12 w-28 text center'
    const activeStyle = 'bg-green-300'
    const disableStyle = 'bg-gray-300'
    const style = baseStyle + " " + `${disable ? disableStyle : activeStyle}`
    if (!isVisible) {
        return <></>
    }
    return (
        <div className={style} onClick={handleOnClick}>
            {title}
        </div>
    )
}

export default Button