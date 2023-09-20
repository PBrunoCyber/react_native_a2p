import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
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
        backgroundColor: '#00AB55',
        borderRadius: 10,
    },

    label: {
        fontSize: 15,
        fontWeight: '500',
        color: '#005249',
        marginBottom: 20,
    },

    btn: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: '#919EAB',
        borderRadius: 6,
        marginHorizontal: 10,
        marginTop: 40,
    },

    btnText: {
        fontWeight: '500',
        color: '#fff',
    },

    btnBox: {
        flexDirection: 'row',
    },
});

export default styles;