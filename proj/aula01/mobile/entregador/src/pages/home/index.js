import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pedido from '../../components/Pedido';

export default function Home({navigation}) {
  const [lista, setLista] = useState([])

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@uinfo')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getData().then((value) => {
      listarPedidos(value)
      setInterval(() => listarPedidos(value), 1500)
    })
  }, [])

  const send = (id_pedido) => {
    const options = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: `{"id_pedido":${id_pedido},"hora_fim":"${new Date().toLocaleTimeString('pt-br').slice(0, 5)}"}`
    };
    
    fetch('http://localhost:5000/comida/pedidos', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }

  const listarPedidos = (entregador) => {
    const options = {method: 'GET'};
    fetch('http://localhost:5000/comida/pedidosex/', options)
      .then(response => response.json())
      .then(response => {
        let aux = []
        console.log(entregador);
        response.forEach(r => {
          console.log(r);
          if ((r.hora_entrega != "" && r.hora_entrega != null) && (r.hora_fim == "" || r.hora_fim == null) && (entregador.nome == r.nome_ent)) {
            aux.push(r)
          }
        })
        setLista(aux)
      })
      .catch(err => console.error(err));
  }

  const logoff = async () => {
    try{
      let resp = await AsyncStorage.removeItem('@uinfo')
      return resp
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}> 
      <Text style={{fontSize: 20, marginBottom: 10}}>Em Entrega</Text>
      <ScrollView style={{height: 720, width: '100%'}}>
        {
          lista.map((l, index) => {
            return(
              <Pedido model={l} onPress={() => send(l.id_pedido)} key={index} />
            )
          })
        }
      </ScrollView>
      <TouchableOpacity style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} onPress={() => logoff().then(navigation.navigate("Login"))}>
        <Text style={{fontSize: 20, color: '#bb0000', textDecorationLine: 'underline', textDecorationColor: '#bb0000'}}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(218, 218, 218)',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
});
