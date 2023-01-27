import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ItemCancelado from '../../components/ItemCancelado';

export default function Cancelados() {
    const [lista, setLista] = React.useState([])

    React.useEffect(() => {
      preencherLista()
      
      setInterval(preencherLista, 1500)
    }, [])

    const preencherLista = () => {
      console.log('preenchendo')
      fetch('http://localhost:5000/tarefas/3', {method: 'GET'})
        .then(response => response.json())
        .then(response => setLista(response))
        .catch(err => console.error(err));
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', padding: 20 }}>
        <ScrollView style={{flex: 1, width: '100%'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
            <View style={{marginRight: 10}}>
              <Text style={{fontSize: 20}}>Canceladas</Text>
            </View>
            <View style={{height: 1, flex: 1, backgroundColor: '#999'}}></View>
          </View>
          {
            lista.map((i, index) => {
              return(
                <ItemCancelado model={i} key={index} />
              )
            })
          }
        </ScrollView>
      </View>
    );
}