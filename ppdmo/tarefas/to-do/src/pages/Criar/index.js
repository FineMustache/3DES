import * as React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Criar({navigation}) {
    const [desc, setDesc] = React.useState("")

    const create = () => {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: `{"descricao":"${desc}","horario_tarefa":"${new Date().toLocaleTimeString("pt-br").slice(0, 5)}"}`
          };
          
          fetch('http://localhost:5000/tarefas/', options)
            .then(response => response.json())
            .then(response => navigation.navigate('Tarefas'))
            .catch(err => console.error(err));
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', padding: 20 }}>
        <View style={{backgroundColor: '#fff', padding: 20, width: '100%'}}>
            <TextInput onChangeText={(v) => setDesc(v)} multiline={true} numberOfLines={4} placeholder={"Digite a Descrição..."} placeholderTextColor={"#555"} style={{width: '100%', padding: 10, backgroundColor: '#ddd'}} />
            <TouchableOpacity onPress={() => create()} style={{width: '100%', backgroundColor: 'tomato', display: 'flex', justifyContent: 'center', marginTop: 20, alignItems: 'center', padding: 5}}>
                <Text style={{fontSize: 20, color: 'white'}}>Criar</Text>
            </TouchableOpacity>
        </View>
        
      </View>
    );
}