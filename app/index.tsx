import { Stack } from 'expo-router';
import { View, Text, Image, TextInput, FlatList } from 'react-native';
import styles from './home.style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRef, useState } from 'react';

const Home = () => {
    const schools = [
        { name: "Selecione uma escola", code: "0" },
        { name: "Instituto Federal do Piauí", code: "1" },
        { name: "Escola Municipal Antônio Nivaldo", code: "2" },
        { name: "Escola Municipal Antônio Waquim", code: "3" },
    ]

    const [selectedSchool, setSeletedSchool] = useState('Selecione uma escola');
    const [isClicked, setIsClicked] = useState(true);
    const [data, setData] = useState(schools);
    const searchRef = useRef();

    const onSearch = (txt: string) : void => {
        if(txt !== ''){
            let tempData = data.filter(item=> {
                return item.name.toLowerCase().indexOf(txt.toLowerCase()) > - 1;
            });
            setData(tempData);
        }else{
            setData(schools);
        }
    }

    return (
        <>
            <Stack.Screen options={{ title: "Home", headerShadowVisible: false }} />
            <View style={styles.container}>
                <Text style={styles.title}></Text>
                <TouchableOpacity style={styles.dropdownSelector} onPress={() => setIsClicked(!isClicked)}>
                    <Text>{selectedSchool}</Text>
                    {isClicked ? <Image source={require('../assets/icons/dropup.png')} style={styles.icon} /> :
                        <Image source={require('../assets/icons/dropdown.png')} style={styles.icon} />}
                </TouchableOpacity>
                {isClicked ?
                    <View style={styles.dropdownArea}>
                        <TextInput placeholder="Pesquisar escolas" style={styles.searchInput} onChangeText={txt => {onSearch(txt)}}/>
                        <FlatList data={data} renderItem={({item, index})=>{
                            return (
                                <TouchableOpacity style={styles.schoolsItem} onPress={()=> { setSeletedSchool(item.name); onSearch(''); setIsClicked(false);}}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        }}/>
                    </View> : null}

            </View>
        </>
    )
}

export default Home;