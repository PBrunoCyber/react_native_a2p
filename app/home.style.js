import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    
    cardContainer: {
        maxWidth: 900,
        backgroundColor: 'white',
        padding: 30,
        marginTop: 40,
        borderRadius: 15,
        width: '100%',
        alignSelf: 'center'
    },
    add:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        paddingBottom: 10,
        borderBottomColor: '#ccc'
    },
    filtros:{
        marginTop: 30,
        paddingBottom: 50,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
    },
    txtFiltros: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#555'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        padding: 20,
    },
    inep_nome: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
    },
    dropdownSelector: {
        flexDirection: 'row',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        minWidth: 200,
        paddingRight: 10
    },
    btnCancelar: {
        height: 40, 
        minWidth: 120,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: 'green'
    },
    btnPesquisar: {
        height: 40, 
        minWidth: 120,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 5,
        backgroundColor: 'green'
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
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: 'green'
    }
});

export default styles;