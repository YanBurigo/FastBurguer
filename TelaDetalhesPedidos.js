import React, { Component } from 'react';
import {View, Text, FlatList, TouchableOpacity, Dimensions, Image, ToastAndroid, Alert} from 'react-native';
import firebase from './Firebase';
import BottomNavigation from './BottomNavigation';
import * as Device from 'expo-device';
import styles from './EstiloTelaDetalhesPedidos';

const ref = firebase.firestore();

const windowWidth = Dimensions.get('window').width;

export default class TelaDetalhesPedidos extends Component {
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
      }
    })

    this.state = {produtos: [], navigation: this.props.navigation}

    this.buscarPedido();
  }

  buscarPedido(){
    ref.collection('Pedidos').get().then(
        snapshot => {
            snapshot.forEach(doc => {
              if(doc.id == Device.osInternalBuildId.toString()+Device.modelName.toString()+";"+this.props.route.params.pedidos){
                var Produtos = doc.data().pedidos;
                this.setState({produtos: [...this.state.produtos, ...Produtos]})
              }
            })
          }
      );
  }

  calcularValorTotal(){
    var valorTotal = 0.0;
    this.state.produtos.forEach(element => {
      valorTotal = valorTotal + (element.valor * element.quantidade);
    });
    return Math.round(valorTotal*100)/100;
  }

  quantidade(operacao, index){
    var arrayProdutos = this.state.produtos;
    if(!operacao){
      if(arrayProdutos[index-1].quantidade == 1){
        ToastAndroid.show("Deve ser selecionado no mínimo uma unidade.", ToastAndroid.SHORT)
      }
      else{
        arrayProdutos[index-1].quantidade = arrayProdutos[index-1].quantidade - 1;
        this.setState({produtos: arrayProdutos})
      }
    }
    else{
      if(arrayProdutos[index-1].quantidade == 10){
        ToastAndroid.show("O máximo permitido são 10 unidades.", ToastAndroid.SHORT)
      }
      else{
        arrayProdutos[index-1].quantidade = arrayProdutos[index-1].quantidade + 1;
        this.setState({produtos: arrayProdutos})
      }
    }
  }

  cancelar(){
    ref.collection("Pedidos").doc(Device.osInternalBuildId.toString()+Device.modelName.toString()+";"+this.props.route.params.pedidos).delete();

    Alert.alert("Sucesso","Seu pedido foi cancelado com sucesso!",[{
      text: "OK",
      onPress: () => this.state.navigation.navigate("TelaPedidos",{cancelado: true})
    }])
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>Pedido {this.props.route.params.pedidos}:</Text>
        <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            data={this.state.produtos}
            renderItem={({item}) => <View style={[styles.view,{width: windowWidth}]}>
              <Image style={styles.image} source={{uri: item.img}}/>
              <View style={styles.viewText}>
                <Text style={styles.textInfo}>{item.descricao.toUpperCase()}</Text>
                <Text style={styles.textInfo}>R$ {item.valor}</Text>
                <Text style={styles.quant}>{item.quantidade} un.</Text>
              </View>
            </View>}
            ListFooterComponent={
            <View>
              <Text style={styles.value}>Total: {this.calcularValorTotal()}</Text>
              <TouchableOpacity style={[styles.buttom, {width: windowWidth-40}]} onPress={()=>this.cancelar()}>
                <View style={styles.viewButtom}>
                  <Text style={styles.textButton}>Cancelar Pedido</Text>
                </View>
              </TouchableOpacity>
            </View>}
          />
       <BottomNavigation navigation={this.props.navigation}></BottomNavigation>
      </View>
    )
  }
}