import { Modal } from "react-native"
import Button from "@/components/common/Button";
import { useRouter } from "next/router";

function DeleteBlockModal(props: any) {
    const { isVisible, setIsVisible } = props
    const router = useRouter()
    const pid = router.query.pid

    async function handleDelete() {
        try {
            const resObject = {
                method: 'Delete',
            }
            await fetch(`/api/primetime/${pid}`, resObject).then(() => router.push('/primetime/all'))
        }
        catch (error) {
            console.log('Failed to Delete', error)
        }
    }
    return (
        <Modal
            animationType="fade"
            onRequestClose={() => setIsVisible(false)}
            presentationStyle='overFullScreen'
            visible={isVisible}
        >
            <div className='flex flex-grow flex-col justify-center items-center'>
                <div> Are you sure you want to delete?</div>
                <Button
                    title='Delete'
                    isVisible={true}
                    disable={false}
                    handleClick={() => handleDelete()}
                />
                <Button
                    title='Cancel'
                    isVisible={true}
                    disable={false}
                    handleClick={() => setIsVisible(false)}
                />
            </div>
        </Modal>
    )
}
export default DeleteBlockModal