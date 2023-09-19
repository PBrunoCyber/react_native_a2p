import { View, Text } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';

const Form = () => {
    const { school } = useLocalSearchParams();
    return (
        <>
            <Stack.Screen options={{ title: `${school}` }} />
            <View>
                <Text>Formulário da escola: {school}</Text>
            </View>
        </>
    )
}


export default Form;
