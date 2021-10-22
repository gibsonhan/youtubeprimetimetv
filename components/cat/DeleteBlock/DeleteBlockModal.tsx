import { Modal } from "react-native"
import Button from "@/components/common/Button";
import { useRouter } from "next/router";

function DeleteBlockModal(props: any) {
    const { isVisible, setIsVisible } = props
    const router = useRouter()
    const pid = router.query.pid

    async function handleDelete() {
        const accessToken = document.cookie
            .split('; ')
            .find((row: string) => row.startsWith('accessToken='))
            ?.split('=')[1];
        try {
            const res = await fetch(`http://localhost:3001/primetime/${pid}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Authorization': `Bearer ${accessToken}`,
                },
                credentials: 'include',
            })
            if (res.ok) router.push('/primetime')
        }
        catch (error) {
            console.log('Failed to Delete')
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