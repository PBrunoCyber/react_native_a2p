import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack initialRouteName='dashboard'
    screenOptions={{
      contentStyle: { backgroundColor: '#dbffdc' }
    }} />;
}