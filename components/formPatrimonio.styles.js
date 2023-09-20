import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    input: {
        width: '100%',
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        borderWidth: 0.5,
        borderRadius: 5,
    },
    nextBtn: {
        height: 50,
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#287bff'
    },
    label: {
        marginTop: 10,
    }
});

export default styles;