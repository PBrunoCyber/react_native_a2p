import { StyleSheet, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center'
    },

    progressBG: {
        width: '90%',
        height: 15,
        backgroundColor: '#C4CDD5',
        marginHorizontal: 25,
        borderRadius: 10,
    },

    progress: {
        width: '50%',
        height: 15,
        backgroundColor: '#287bff',
        borderRadius: 10,
    },

    label: {
        fontSize: 15,
        fontWeight: '500',
        color: '#005249',
        marginBottom: 20,
    },
    btn: {
        height: 50,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#287bff'
    },
    containerBtn: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
    }
});

export default styles;