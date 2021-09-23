import { ScrollView } from "react-native"

function Carousel(props: any) {
    return (
        <ScrollView
            horizontal={true}
            pagingEnabled={true}

        >
            {props.children}
        </ScrollView>
    )
}

export default Carousel