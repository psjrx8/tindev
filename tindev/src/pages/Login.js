import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { 
    View,
    Text, 
    StyleSheet, 
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';

/* Para dispositivos mobile, deve-se preocupar com a densidade de pixels que será apresentado em tela
 Pensando neste cenário, nomear as imagens com @2x (2x a densidade) e @3x (3x a densidade), permite que a aplicação
 determine qual o melhor modelo para utilização. */
import logo from '../images/logo.png';
import api from '../services/api';

export default function Login({ navigation }){
    const [ user, setUser ] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then( user => {
            if (user){
                navigation.navigate('Main', { user })
            }
        })
    }, []);

    async function handleLogin() {
        const response = await api.post('/devs', { username: user });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', { user: _id });
    }

    return (
        <View style={styles.container}>
            <Image source={logo}/>
            <TextInput placeholder='Digite seu usuário no GitHub'
                placeholderTextColor='#999999'
                autoCapitalize='none'
                autoCorrect={false}
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text sytle={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
            </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    input:{
        height: 46,
        alignSelf: 'stretch', /* Ocupar toda largura possível */
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },
    button:{
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});