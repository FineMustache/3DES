import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';

const colors = {
    "gray": "rgb(218, 218, 218)",
    "darkGray": "#fff",
    "lightGray": '#868686',
    "yellow": '#c4a000',
    "white": '#ffffff'
}



const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@uinfo', jsonValue)
  } catch (e) {
    console.log(e);
  }
}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@uinfo')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log(e);
  }
}

export default function LoginScreen({navigation}) {
    const [errOn, setErrOn] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

      const logar = () => {
        if (email.length > 0 && password.length > 0) {
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: `{"email":"${email}","senha":"${password}"}`
            };
            
            fetch('http://localhost:5000/comida/entregadores', options)
                .then(response => response.json())
                .then(response => {
                    if (response.id_entregador) {
                        storeData(response).then(
                            navigation.reset({
                                index: 0,
                                routes: [{name: 'Home'}],
                              })
                        )
                    }else{
                        setErrOn(true)
                    }
                })
                .catch(err => console.error(err));
        }
        
    }
    
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 30, marginBottom: 20}}>Login</Text>
        <View style={styles.login}>
            <TextInput placeholder={"E-mail"} style={styles.input} placeholderTextColor={colors.lightGray} onChangeText={(val) => { setEmail(val) }}/>
            <TextInput secureTextEntry={true} placeholder={"Senha"} style={styles.input} placeholderTextColor={colors.lightGray} onChangeText={(val) => {setPassword(val)}}/>
            <Text style={{...styles.font, display: errOn ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', width: '100%', color: '#bb0000'}}>Credenciais Inválidas</Text>
            <TouchableOpacity onPress={() => logar()} style={styles.cta}>
                <Text style={{textAlign: 'center', color: '#fff'}}>Entrar</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    'container': {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.gray,
        padding: 50
    },
    'login': {
        display: 'flex',
        alignContent: 'center',
        backgroundColor: colors.darkGray,
        width: '100%',
        padding: 25
    },
    'input':{
        padding: 10,
        color: '#000',
        width: '100%',
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
        marginBottom: 10,
    },
    'cta':{
        padding: 10,
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: 'rgb(202, 98, 0)',
        borderWidth: 1,
        marginTop: 25,
        backgroundColor: 'rgb(202, 98, 0)'
    },
    'white':{
        color: '#ffffff'
    },
    'font': {
    }
})
