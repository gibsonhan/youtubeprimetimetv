function Input(props: any) {
    const { title, type, value } = props
    const id = title
    const htmlFor = title
    const name = title

    return (
        <div className="flex flex-col mb-4 w-48">
            <label className="mb-2 uppercase font-bold text-lg text-grety-darkets" htmlFor={htmlFor}>{title}</label>
            <input className="border" id={id} name={name} type={type} value={value} />
        </div>
    )
}

export default Input