import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        padding: 20,
    },
    dropdownSelector: {
        flexDirection: 'row',
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'black',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    icon: {
        width: 20,
        height: 20
    },
    dropdownArea: {
        width: '90%',
        borderRadius: 10,
        paddingBottom: 20,
        marginTop: 20,
        elevation: 5,
        backgroundColor: '#fff',
        alignSelf: 'center'
    },
    searchInput: {
        width: '90%',
        height: 40,
        borderRadius: 10,
        borderWidth: 0.5,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: "black",
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    schoolsItem: {
        width: '85%',
        height: 50,
        borderBottomColor: '#8e8e8e',
        borderBottomWidth: .2,
        justifyContent: 'center',
        alignSelf: 'center'
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
    addBtn: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 100,
        backgroundColor: '#287bff'
    }
});

export default styles;