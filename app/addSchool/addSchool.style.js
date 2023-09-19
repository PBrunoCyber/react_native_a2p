import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 18,
        backgroundColor: '#fff'
    },
    label: {
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 0,
        alignSelf: 'center',
        marginBottom: 0,
        width: '100%',
    },
    input: {
        height: 50,
        alignSelf: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 5,
        width: '100%',

    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: 20,
        alignSelf: 'center'
    },
    picker: {
        borderWidth: 0.5,
        borderRadius: 5
    },
    saveBtn: {
        width: '100%',
        height: 50,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#287bff'
    }
});

export default styles;