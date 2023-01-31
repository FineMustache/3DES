import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

export default function Pedido(props) {
    const {model, onPress} = props

    return(
        <View style={{marginBottom: 10, width: '100%'}}>
            <View style={{backgroundColor: '#fff', padding: 20}}>
          <View>
            <Text style={{color: 'rgb(202, 98, 0)', fontSize: 17, marginBottom: 5}}>Id: <Text style={{color: '#000'}}>{model.id_pedido}</Text></Text>
            <Text style={{color: 'rgb(202, 98, 0)', fontSize: 17, marginBottom: 5}}>Cliente: <Text style={{color: '#000'}}>{model.cliente}</Text></Text>
            <Text style={{color: 'rgb(202, 98, 0)', fontSize: 17, marginBottom: 5}}>Produto: <Text style={{color: '#000'}}>{model.produto}</Text></Text>
            <Text style={{color: 'rgb(202, 98, 0)', fontSize: 17, marginBottom: 5}}>Endereço: <Text style={{color: '#000'}}>{model.endereco}</Text></Text>
            <Text style={{color: 'rgb(202, 98, 0)', fontSize: 17, marginBottom: 5}}>Data: <Text style={{color: '#000'}}>{model.data}</Text></Text>
            <Text style={{color: 'rgb(202, 98, 0)', fontSize: 17, marginBottom: 5}}>Horário: <Text style={{color: '#000'}}>{model.hora_pedido}</Text></Text>
          </View>
          <TouchableOpacity onPress={() => onPress()} style={{padding: 10, display: 'flex', backgroundColor: 'rgb(202, 98, 0)', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 20}}>Finalizar Entrega</Text>
          </TouchableOpacity>
        </View>
        </View>
    )
}