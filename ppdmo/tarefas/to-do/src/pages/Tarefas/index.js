import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Item from '../../components/Item';

export default function Tarefas({navigation}) {
    const [listaAberta, setListaAberta] = React.useState([])
    const [listaConcluida, setListaConcluida] = React.useState([])
    const [modal, setModal] = React.useState(false)

    React.useEffect(() => {
      preencherLista()
      
      setInterval(preencherLista, 1500)
    }, [])

    const preencherLista = () => {
      console.log('preenchendo')
      fetch('http://localhost:5000/tarefas/1', {method: 'GET'})
        .then(response => response.json())
        .then(response => setListaAberta(response))
        .catch(err => console.error(err));

      fetch('http://localhost:5000/tarefas/2', {method: 'GET'})
        .then(response => response.json())
        .then(response => setListaConcluida(response))
        .catch(err => console.error(err));
    }

    const concluir = (id) => {
      const options = {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: `{"id":${id},"horario_enc":"${new Date().toLocaleTimeString("pt-br").slice(0, 5)}}"}`
        };
        
        fetch('http://localhost:5000/tarefas/concluir', options)
          .then(response => response.json())
          .then(response => navigation.replace(
            'Tarefas',
            null,
            null
          ))
          .catch(err => console.error(err));
  }

  const cancelar = (id) => {
    const options = {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: `{"id":${id}}`};

    fetch('http://localhost:5000/tarefas/cancelar', options)
      .then(response => response.json())
      .then(response => navigation.navigate('Canceladas'))
      .catch(err => console.error(err));
  }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', padding: 20 }}>
        <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,.5)', top: 0, left: 0, zIndex: 5, display: !modal ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{backgroundColor: '#fff', padding: 20}}>
            <Text style={{fontSize: 20}}>Deseja mesmo Cancelar essa Tarefa?</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
              <TouchableOpacity onPress={() => setModal(false)} style={{backgroundColor: '#ddd', padding: 10}}> 
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => cancelar()} style={{backgroundColor: 'tomato', padding: 10}}>
                <Text style={{color: 'white'}}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView style={{flex: 1, width: '100%'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
            <View style={{marginRight: 10}}>
              <Text style={{fontSize: 20}}>Abertas</Text>
            </View>
            <View style={{height: 1, flex: 1, backgroundColor: '#999'}}></View>
          </View>
          {
            listaAberta.map((i, index) => {
              return(
                <Item onLongPress={setModal} onPress={concluir} model={i} key={index} />
              )
            })
          }
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
            <View style={{marginRight: 10}}>
              <Text style={{fontSize: 20}}>Concluídas</Text>
            </View>
            <View style={{height: 1, flex: 1, backgroundColor: '#999'}}></View>
          </View>
          {
            listaConcluida.map((i, index) => {
              return(
                <Item model={i} key={index} />
              )
            })
          }
        </ScrollView>
      </View>
    );
}