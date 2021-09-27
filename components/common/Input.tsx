function Input(props: any) {
    const { title, type, inputValue, setInputValue, handleBlur, handleKeyPress } = props

    const handleOnChange = (e: any) => {
        e.preventDefault()
        setInputValue(e.target.value)
    }

    return (
        <div className="flex flex-col mb-4 w-48">
            <label className="mb-1 uppercase font-bold text-lg text-grety-darkets" htmlFor={title}>{title}</label>
            <input
                className="border"
                id={title}
                name={title}
                type={type}
                value={inputValue}
                onChange={handleOnChange}
                onKeyPress={handleKeyPress}
                onBlur={handleBlur}
            />
        </div>
    )
}

export default Input