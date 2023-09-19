import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginTop: 50
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
        height: 400,
        borderRadius: 10,
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
    }
});

export default styles;