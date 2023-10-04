import { Stack } from 'expo-router';
import { COLORS } from '../constants/theme'
import { Provider } from '../context/EstruturaFisicaEscolar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return <Provider>
    <Stack initialRouteName='index'
      screenOptions={{
        contentStyle: { backgroundColor: COLORS.lightGreen },
        headerShown: false,
      }} /></Provider>
}