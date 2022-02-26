import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image, Alert, ToastAndroid} from 'react-native';
import styles from './EstiloTelaAdicionarCarrinho';
import firebase from './Firebase';
import BottomNavigation from './BottomNavigation';
import * as Device from 'expo-device';

const ref = firebase.firestore();

export default class TelaAdicionarCarrinho extends Component {
  
  constructor(props){
    super(props);
    this.state = {colecao: '',
                  usuario: '',
                  idade: ''};
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
    })
    
    this.state = {quantidade: 1, lista: []}
  }
 
  buscarDados(){
    ref.collection('Carrinhos').get().then(
      snapshot => {
          snapshot.forEach(doc => {
            if(doc.id.includes(Device.osInternalBuildId.toString()+Device.modelName.toString())){
              var Lista = {
                pedidos: doc.data().pedidos
              }
              var listaPedido = Lista;
              var todosPedidos = [...new Set([...listaPedido.pedidos,{id: this.props.route.params.produto.id, quantidade: this.state.quantidade}])]
              this.setState({lista: todosPedidos})
              ref.collection("Carrinhos").doc(Device.osInternalBuildId.toString()+Device.modelName.toString()).set({
                "pedidos": this.state.lista,
              });
            }
          })
          if(this.state.lista.length == 0){
            this.setState({lista: [...this.state.lista, {id: this.props.route.params.produto.id, quantidade: this.state.quantidade}]})
            ref.collection("Carrinhos").doc(Device.osInternalBuildId.toString()+Device.modelName.toString()).set({
              "pedidos": this.state.lista,
            });
          }
      }
      
    )
  }

  salvar(){
    this.buscarDados();
    Alert.alert("Sucesso", "Seu produto foi adicionado ao carrinho!");
  }

  quantidade(operacao){
    if(!operacao){
      if(this.state.quantidade == 1){
        ToastAndroid.show("Deve ser selecionado no mínimo uma unidade.", ToastAndroid.SHORT)
      }
      else{
        this.setState({quantidade: this.state.quantidade - 1})
      }
    }
    else{
      if(this.state.quantidade == 10){
        ToastAndroid.show("O máximo permitido são 10 unidades.", ToastAndroid.SHORT)
      }
      else{
        this.setState({quantidade: this.state.quantidade + 1})
      }
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.viewImage}>
          <Image style={styles.image} source={{uri: this.props.route.params.produto.img}}/>
         </View>
         <View style={styles.viewText}>
          <Text style={styles.text}>{this.props.route.params.produto.descricao.toUpperCase()}</Text>
          <Text style={styles.text}>R$ {this.props.route.params.produto.valor}</Text>
          <View style={styles.viewQuant}>
            <TouchableOpacity onPress={()=>this.quantidade(false)}>
              <Text style={styles.negativeButtom}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quant}>{this.state.quantidade}</Text>
            <TouchableOpacity  onPress={()=>this.quantidade(true)}>
              <Text style={styles.positiveButtom}>+</Text>
            </TouchableOpacity>
          </View>
         </View>
         <TouchableOpacity style={styles.buttom} onPress={()=>{this.salvar();this.props.navigation.navigate("TelaInicial");}}>
           <View style={styles.viewButtom}>
             <Text style={styles.textButtom}>Adicionar ao carrinho</Text>
           </View>
         </TouchableOpacity>
         <TouchableOpacity style={styles.buttom} onPress={()=>this.props.navigation.goBack()}>
          <View style={styles.viewButtom}>
             <Text style={styles.textButtom}>Voltar</Text>
           </View>
         </TouchableOpacity>
         <BottomNavigation navigation={this.props.navigation}></BottomNavigation>
      </View>
    )
  }
}