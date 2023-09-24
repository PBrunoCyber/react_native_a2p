import { StyleSheet } from "react-native";
import { COLORS } from '../constants/theme';

const styles = StyleSheet.create({
    
    formFlexOptions: {
        flexDirection: 'row',
        gap: 40,
        alignItems: 'center'
    },
    checkbox: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.green,
        borderRadius: 5,
        width: 25, 
        height: 25,
      },
      checked: {
        backgroundColor: COLORS.green
      }
});

export default styles;