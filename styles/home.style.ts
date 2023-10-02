import { AnimatableNumericValue, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../constants/theme';



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
        alignSelf: 'center',
         zIndex: -1
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
    },
    deleteCard: {
        maxWidth: 260,
        gap: 20,
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 25,
        textAlign: 'left'
    },
    deleteBtnExcluir: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 5,
        borderWidth: 1,
        backgroundColor: COLORS.darkRed,
        borderColor: COLORS.darkRed,
        borderRadius: 50,       
    },
    messageOk: {
        position: 'absolute',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
        maxWidth: '95%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
        gap: 10,
        zIndex: 99999,
        backgroundColor: COLORS.lightGreen,
        borderWidth: 1,
        borderColor: COLORS.green,
        borderRadius: 5
    },
    messageError: {
        position: 'absolute',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
        gap: 10,
        maxWidth: '95%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        paddingRight: 30,
        paddingTop: 10,
        zIndex: 99999,
        paddingBottom: 10,
        backgroundColor: COLORS.lightRed,
        borderWidth: 1,
        borderColor: COLORS.red,
        borderRadius: 5
    }
});

export const deleteContainer = (scale: AnimatableNumericValue,display: "none" | "flex" | undefined): ViewStyle => ({
    top: '35%',
    transform: [{ scale: scale}],
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 999999,
    display: display
});

export const deleteBackgroud = (opacity: AnimatableNumericValue, display: "none" | "flex" | undefined) : ViewStyle => ({
    display: display,
    opacity: opacity,
    backgroundColor: COLORS.black,
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex:99999
});


export default styles;