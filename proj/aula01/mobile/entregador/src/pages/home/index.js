import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Pedido from '../../components/Pedido';

export default function Home() {
  const [lista, setLista] = useState([])

  useEffect(() => {
    listarPedidos()
    setInterval(() => listarPedidos(), 1500)
  }, [])

  const send = (id_pedido) => {
    const options = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: `{"id_pedido":${id_pedido},"hora_entrega":"${new Date().toLocaleTimeString('pt-br').slice(0, 5)}","hora_fim":null}`
    };
    
    fetch('http://localhost:5000/comida/pedidos', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }

  const listarPedidos = () => {
    const options = {method: 'GET'};
    fetch('http://localhost:5000/comida/pedidosex/', options)
      .then(response => response.json())
      .then(response => {
        let aux = []
        response.forEach(r => {
          if ((r.hora_entrega != "" && r.hora_entrega != null) && (r.hora_fim == "" || r.hora_fim == null)) {
            aux.push(r)
          }
        })
        setLista(aux)
      })
      .catch(err => console.error(err));
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
