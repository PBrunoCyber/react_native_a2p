import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Provider } from '../../context/EstruturaFisicaEscolar';


export default function Layout() {
    return (
        <Provider>
            <Drawer screenOptions={({ navigation }) => ({
                sceneContainerStyle: { backgroundColor: COLORS.lightGreen },
                headerStyle: { backgroundColor: COLORS.green },
                headerShadowVisible: false,
                headerTintColor: COLORS.white,
                drawerContentStyle: { backgroundColor: COLORS.lightGreen },
                drawerActiveTintColor: COLORS.white,
                drawerIcon: () => <Ionicons name='menu' size={30} />,
                headerLeft: () => <TouchableOpacity onPress={navigation.toggleDrawer}><Ionicons name='menu' color={COLORS.white} size={30} style={{ marginLeft: 20 }} /></TouchableOpacity>,
                headerRight: () => <Ionicons name='exit-outline' color={COLORS.white} size={30} style={{ marginRight: 20 }} />,
                drawerActiveBackgroundColor: COLORS.green,
                drawerInactiveTintColor: COLORS.green,
                headerTitleAlign: 'center',
                drawerType: "back"
            })}>
                <Drawer.Screen name='index'
                    options={{
                        drawerLabel: "Página Inicial",
                        title: 'Página Inicial',
                        drawerIcon: ({ color }) => <Ionicons name='home-outline' size={30} color={color} />,
                        drawerActiveTintColor: COLORS.white,
                    }} />
                <Drawer.Screen name='loadEscolas/index'
                    options={{
                        drawerLabel: "Carregar Escolas",
                        title: 'Carregar Escolas',
                        drawerActiveTintColor: COLORS.white,
                        drawerIcon: ({ color }) => <Ionicons name='cloud-download-outline' size={30} color={color} />,
                    }} />
                <Drawer.Screen name='addEstruturaFisicaEscolar/index'
                    options={{
                        drawerLabel: "Novo Formulário",
                        title: "Novo Formulário",
                        drawerActiveTintColor: COLORS.white,
                        drawerIcon: ({ color }) => <Ionicons name='add' size={30} color={color} />,
                    }} />
                <Drawer.Screen name='editEstruturaFisicaEscolar/index'
                    redirect={true}
                    options={{
                        drawerLabel: "Editar Formulário",
                        title: 'Editar Formulário',
                        drawerActiveTintColor: COLORS.white,
                        drawerIcon: ({ color }) => <Ionicons name='pencil' size={30} color={color} />,
                    }} />
            </Drawer>
        </Provider>
    )
}