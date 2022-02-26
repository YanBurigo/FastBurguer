import React, { Component } from 'react';
import {View, Text, FlatList, TouchableOpacity,Image} from 'react-native';
import firebase from './Firebase';
import BottomNavigation from './BottomNavigation';
import * as Device from 'expo-device';
import styles from './EstiloTelaPedidos';

const ref = firebase.firestore();

export default class TelaPedidos extends Component {
  constructor(props){
    super(props)
    this.state = {colecao: '',
                  id: ''};

    this.props.navigation.setOptions({
      title: "FAST BURGUER IFSC",
      headerStyle:{
        backgroundColor: 'rgb(189,0,0)',
      },
      headerTintColor: 'rgb(214,192,0)',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 26
      },
      headerLeft: null
    })
    this.state = {pedidos: []};
    this.buscarPedidos();
  }

  componentWillReceiveProps(){
    this.state = {pedidos: []};
    this.buscarPedidos();
  }
  
  buscarPedidos(){
    ref.collection('Pedidos').get().then(
      snapshot => {
          snapshot.forEach(doc => {
            if(doc.id.includes(Device.osInternalBuildId.toString()+Device.modelName.toString())){
              this.setState({pedidos: [...this.state.pedidos, doc.id.split(";")[1]]});
            }
          });
        }
    );
  }

  render() {
    return(
      <View style={styles.container}>
        <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            data={(this.state.pedidos)}
            renderItem={({item}) => <View>
              <TouchableOpacity style={styles.buttom} onPress={()=>this.props.navigation.navigate("TelaDetalhesPedidos", {pedidos: item})}>
                <Text style={styles.textButtom}>Pedido {item}</Text>
                <Image style={styles.imageButtom} source={require("./assets/seta.png")}/>
              </TouchableOpacity>
            </View>
          }
          />
       <BottomNavigation navigation={this.props.navigation}></BottomNavigation>
      </View>
    )
  }
}