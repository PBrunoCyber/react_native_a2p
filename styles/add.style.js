import { StyleSheet } from "react-native";
import { COLORS } from '../constants/theme'

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        elevation: 20,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        zIndex: -1
    },
    container: {
        maxWidth: 900,
        padding: 40,
        width: '100%',
        alignSelf: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 20,
        width: '100%',
        alignItems: 'center'
    },
    btnSalvarRascunho: {
        width: 200,
        height: 40,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: COLORS.green,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInfo: {
        fontSize: 18,
        color: `${COLORS.darkGray}`,
        marginTop: 20,
        fontStyle: 'italic',
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.gray,
        paddingBottom: 50
    },
    filtros: {
        marginTop: 30,
        paddingBottom: 50,
    },
    txtFiltros: {
        fontWeight: 'bold',
        fontSize: 15,
        color: COLORS.green
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
        zIndex: 9999,
        paddingRight: 10
    },
    dropdownArea: {
        borderRadius: 10,
        paddingBottom: 20,
        marginBottom: 20,
        marginTop: 90,
        width: '100%',
        elevation: 5,
        zIndex: 9999,
        position: 'absolute',
        backgroundColor: COLORS.lightGreen,
        alignSelf: 'center'
    },
    schoolsItem: {
        width: '90%',
        height: 50,
        borderBottomColor: COLORS.green,
        borderBottomWidth: .2,
        justifyContent: 'center',
        alignSelf: 'center',
        zIndex: 99999,
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
    inputAnexo: {
        height: 50,
        width: '100%',
        position: 'absolute',
        borderRadius: 10,
        paddingLeft: 20,
        marginTop: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        zIndex: -99999
    },
    btnSalvar: {
        width: 150,
        backgroundColor: COLORS.green,
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnCancelar: {
        width: 150,
        height: 40,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: COLORS.green,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageOk: {
        position: 'fixed',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
        maxWidth: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,

        gap: 10,
        zIndex: 999,
        backgroundColor: COLORS.lightGreen,
        borderWidth: 1,
        borderColor: COLORS.green,
        borderRadius: 5
    },
    messageError: {
        position: 'fixed',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
        gap: 10,
        maxWidth: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        paddingRight: 30,
        paddingTop: 10,
        zIndex: 999,
        paddingBottom: 10,
        backgroundColor: COLORS.lightRed,
        borderWidth: 1,
        borderColor: COLORS.red,
        borderRadius: 5
    }
});

export default styles;