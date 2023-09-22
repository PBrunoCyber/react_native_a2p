import { StyleSheet } from "react-native";
import { COLORS } from '../constants/theme'

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        backgroundColor: COLORS.white,
        marginTop: 40,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: 1000
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
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 0.5,
    },
    txtFiltros: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#555'
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