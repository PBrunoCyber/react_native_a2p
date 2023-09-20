import { ScrollView, View, Text } from 'react-native';

interface IChildren {
    children: React.ReactNode
}

const InputScroll = ({ children }: IChildren) => {
    return (
        <ScrollView contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}>
            <View style={{ flex: 1, margin: 20 }}>
                {children}
            </View>
        </ScrollView>
    )
}

export default InputScroll;