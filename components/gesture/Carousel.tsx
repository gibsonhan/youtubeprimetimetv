import { ScrollView } from "react-native"

function Carousel(props: any) {
    return (
        <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
        >
            {props.children}
        </ScrollView>
    )
}

export default Carousel