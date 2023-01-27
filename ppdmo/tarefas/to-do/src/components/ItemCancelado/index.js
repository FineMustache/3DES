import * as React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ItemCancelado(props){
    const {model} = props

    return(
        <TouchableOpacity onLongPress={(params) => {}} style={{flex: 1, backgroundColor: '#fff', width: '100%', padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 10, opacity: .5}}>
            <Text style={{fontSize: 24, width: '20%'}}>{model.hora_tarefa}</Text>
            <Text style={{width: '75%'}}>{model.descricao}</Text>
            <View style={{width: '5%'}}>
                <Ionicons name={"close"} size={24} color={status ? 'tomato' : "#888"} />
            </View>
        </TouchableOpacity>
    )
}