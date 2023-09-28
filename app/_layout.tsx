import { Stack } from 'expo-router';
import { COLORS } from '../constants/theme'
import { Provider } from '../context/EstruturaFisicaEscolar';

export default function Layout() {
  return <Provider><Stack initialRouteName='dashboard'
    screenOptions={{
      contentStyle: { backgroundColor: COLORS.lightGreen }
    }} /></Provider>;
}