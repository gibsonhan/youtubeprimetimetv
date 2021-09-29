export default function Icon(props: any) {
    return (
        <div
            className="flex justify-center items-center h-10 w-10 bg-gray-200"
            onClick={() => props.handleOnClick()}
        >
            {props.icon}
        </div>
    )
}