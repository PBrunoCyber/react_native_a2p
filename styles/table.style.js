import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    tableCard: {
        maxWidth: 900,
        backgroundColor: 'white',
        padding: 30,
        marginTop: 20,
        borderRadius: 15,
        width: '100%',
        alignSelf: 'center',
        zIndex: 999,
    },
    tableContainerContent: {
        marginTop: 40,
        flexDirection: 'column',
        gap: 40,
    },
    tableHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        minWidth: 900,
    },
    tableContent: {
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 900,
    }, addBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: 'green'
    },
});

export default styles;