export interface Button {
    height?: string,
    width?: string,
    disable?: boolean,
    handleClick?: () => void,
    isVisible: boolean,
    shape?: string,
    title: string,
}