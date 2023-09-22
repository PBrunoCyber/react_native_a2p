import { Stack } from 'expo-router';
import { COLORS } from '../constants/theme'

export default function Layout() {
  return <Stack initialRouteName='dashboard'
    screenOptions={{
      contentStyle: { backgroundColor: COLORS.lightGreen }
    }} />;
}