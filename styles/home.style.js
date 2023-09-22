import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({


    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        padding: 20,
    },

    icon: {
        width: 20,
        height: 20
    },



    button: {
        width: "90%",
        height: 50,
        backgroundColor: '#287bff',
        borderRadius: 10,
        zIndex: -1,
        borderColor: 'none',
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    containerBtn: {
        position: 'absolute',
        bottom: 30,
        right: 20,
    },


    paginationIcon: {
        backgroundColor: 'green',
        padding: 5,
        borderRadius: 5,
    },
    paginationContainer: {
        marginTop: 20,
        marginBottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        alignSelf: 'center'
    },
    syncBtn: {
        height: 40,
        width: 150,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'green',
        justifyContent: 'center',
        borderRadius: 5,
        gap: 10,
        alignSelf: 'flex-end'
    }
});

export default styles;