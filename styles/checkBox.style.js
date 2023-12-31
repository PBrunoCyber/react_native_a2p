import { StyleSheet } from "react-native";
import { COLORS } from '../constants/theme';

const styles = StyleSheet.create({

  formFlexOptions: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 35,
    alignItems: 'center',
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.green,
    borderRadius: 5,
    width: 25,
    height: 25,
  },
  checked: {
    backgroundColor: COLORS.green
  },
  checkboxDisable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.gray,
    borderRadius: 5,
    width: 25,
    height: 25,
  },
  checkedDisable: {
    backgroundColor: COLORS.gray
  }
});

export default styles;