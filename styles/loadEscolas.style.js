import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        width: '100%',
        maxWidth: 900,
        marginTop: 20,
        borderRadius: 25,
        padding: 40,
        alignSelf: 'center',
        backgroundColor: COLORS.white,
    },
    input: {
        height: 40,
        minWidth: 200,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderColor: COLORS.lightBlack
    },
    gre_senha: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 20
    },
    btnLoad: {
        height: 40,
        minWidth: 100,
        paddingLeft: 20,
        paddingRight: 20,
        gap: 10,
        paddingVertical: 5,
        marginTop: 20,
        width: 200,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        borderRadius: 5,
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

export default styles;