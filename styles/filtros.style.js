import { StyleSheet } from "react-native";
import { COLORS } from '../constants/theme'

const styles = StyleSheet.create({
    cardContainer: {
        maxWidth: 900,
        backgroundColor: COLORS.white,
        padding: 30,
        marginTop: 40,
        borderRadius: 15,
        width: '100%',
        alignSelf: 'center',
        zIndex: 999,
    },
    add: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        paddingBottom: 10,
        borderBottomColor: COLORS.gray
    },
    filtros: {
        marginTop: 30,
        paddingBottom: 50,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 0.5,
    },
    txtFiltros: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#555'
    },
    addBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: COLORS.green
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
        borderColor: COLORS.gray,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        minWidth: 200,
        paddingRight: 10
    },
    dropdownArea: {
        borderRadius: 10,
        paddingBottom: 20,
        marginBottom: 20,
        marginTop: 90,
        width: '100%',
        elevation: 5,
        position: 'absolute',
        backgroundColor: COLORS.lightGreen,
        alignSelf: 'center'
    }, schoolsItem: {
        width: '90%',
        height: 50,
        borderBottomColor: COLORS.green,
        borderBottomWidth: .2,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    searchInput: {
        width: '90%',
        height: 40,
        borderRadius: 5,
        borderWidth: 0.5,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: COLORS.green,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20,
    },

});

export default styles;