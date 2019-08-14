import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import api from '../services/api'

import logo from '../images/logo.png';
import like from '../images/like.png';
import dislike from '../images/dislike.png';

export default function Main( { navigation }) {
    
    const id = navigation.getParam('user');

    // Utilizar useState toda vez que a variável em tela for manipulavel
    const [ users, setUsers ] = useState([]);

    // Método para fazer a chamada a api assim que for chamado em tela
    // Recebe dois parâmetros, a função que quer executar e quando quer executar a função
    // Passando o segundo parâmetro como um array de variáveis, ele vai executar para toda alteração daquela variável.
    // Sem passar parâmetro, ele executa apenas uma vez.
    useEffect(() => {
        async function loadUsers(){ // Evita-se utilizar o async na useEffect
            const response = await api.get('/devs', { 
                headers: {
                    user: id,
                }
            })
            setUsers(response.data);
        }

        loadUsers();
    }, [id])
    
    async function handleLike(){
        const [ user, ...rest ] = users; // Armazena o primeiro no user e o restante n rest

        await api.post('/devs/' + user._id + '/likes', null , { 
            headers: {
                user: user._id,
            }
        })
        //users só pode ser alterado através da função setUsers.
        setUsers(rest); // Filtrando array de usuarios para não receber o mesmo usuário novamente.
    }

    async function handleDislike(){
        const [ user, ...rest ] = users; // Armazena o primeiro no user e o restante n rest

        await api.post('/devs/' + user._id + '/dislikes', null , { 
            headers: {
                user: user._id,
            }
        })
        //users só pode ser alterado através da função setUsers.
        setUsers(rest); // Filtrando array de usuarios para não receber o mesmo usuário novamente.
    }

    async function handleLogout (){
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image  sytle={styles.logo} source={logo}/>
            </TouchableOpacity>
            <View style={styles.cardsContainer}>
                { users.length > 0 ? 
                users.map((user, index) => (
                        <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
                            <Image style={styles.avatar} source={{ uri: user.avatar}}/>
                            <View sytle={styles.footer}>
                                <Text style={styles.name}>{user.name}</Text>
                                <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                            </View>
                        </View>
                )): <Text style={styles.empty}>Acabou :(</Text> }
            </View>
            { users.length > 0 && 
                <View styles={styles.buttonsContainer}>
                    <TouchableOpacity onPress={handleLike} style={styles.button}>
                        <Image source={like}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDislike} style={styles.button}>
                        <Image source={dislike}></Image>
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between' /* Cria um espaço entre os elementos */
    },
    logo: {
        marginTop: 30,
    },
    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold'
    },
    cardsContainer:{
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
    },
    avatar: {
        flex: 1,
        height: 300,
    },
    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 15,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        }
    }
});