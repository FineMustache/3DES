import * as React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Item(props){
    const [status, setStatus] = React.useState(false)
    const {model, onPress, onLongPress} = props
    React.useEffect(() => {
        if (model.status == 2) {
            setStatus(true)   
        }
    })

    
    return(
        <TouchableOpacity onLongPress={() => onLongPress(true)} style={{flex: 1, backgroundColor: '#fff', width: '100%', padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 10, opacity: status ? .5 : 1}}>
            <Text style={{fontSize: 24, width: '20%'}}>{model.hora_tarefa}</Text>
            <Text style={{width: '75%'}}>{model.descricao}</Text>
            <TouchableOpacity onPress={() => onPress(model.id)} style={{width: '5%'}}>
                <Ionicons name={status ? "checkbox" : "square-outline"} size={24} color={status ? 'tomato' : "#888"} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}