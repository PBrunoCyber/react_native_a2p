import { StyleSheet } from "react-native";
import { COLORS } from '../constants/theme';

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    formContainer: {
        marginBottom: 30
    },
    messageError: {
        marginTop: 10,
        color: COLORS.red,
    },
    formFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
        marginBottom: 40,
        gap: 20,
        justifyContent: 'space-between'
    },
    input: {
        maxWidth: '100%',
        height: 40,
        minWidth: 200,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: COLORS.gray
    },
    formFlexOptions: {
        flexDirection: 'row',
        gap: 30,
    },
    formFlexOption: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 100
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
        zIndex: 999,
        paddingRight: 10
    },
    dropdownArea: {
        borderRadius: 10,
        paddingBottom: 20,
        marginBottom: 20,
        marginTop: 60,
        width: '100%',
        elevation: 5,
        position: 'absolute',
        backgroundColor: COLORS.lightGreen,
        borderWidth: 1,
        borderColor: COLORS.green,
        elevation: 5,
        alignSelf: 'center',
        zIndex: 999
    }, 
    schoolsItem: {
        width: '90%',
        height: 50,
        borderBottomColor: COLORS.green,
        borderBottomWidth: .2,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    searchInput: {
        position: 'relative',
        width: '100%',
        height: 40,
        borderRadius: 100,
        borderWidth: 0.5,
        paddingLeft: 40,
        paddingRight: 20,
        borderColor: COLORS.green,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        zIndex: 999
    },
});

export default styles;