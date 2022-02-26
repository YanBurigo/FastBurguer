import React, { Component } from 'react';
import {View, Text, FlatList, TouchableOpacity, Dimensions, Image, ToastAndroid, Alert} from 'react-native';
import firebase from './Firebase';
import BottomNavigation from './BottomNavigation'
import * as Device from 'expo-device';
import styles from './EstiloTelaCarrinho';

const ref = firebase.firestore();

const windowWidth = Dimensions.get('window').width;

export default class TelaCarrinho extends Component {
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

    this.state = {produtos: [], idCounter: 1}

    this.buscarDados();
  }

  componentWillReceiveProps(){
    this.state = {produtos: [], idCounter: 1}
  }
  
  buscarDados() {
    ref.collection('Carrinhos').get().then(
      snapshot => {
          snapshot.forEach(doc => {
              if(doc.id.includes(Device.osInternalBuildId.toString()+Device.modelName.toString())){
                var Lista = {
                  pedidos: doc.data().pedidos
                }
                var listaPedido = Lista.pedidos;
                listaPedido.forEach(element => {
                  ref.collection('Produtos').get().then(
                    snapshot => {
                        snapshot.forEach(doc => {
                          if(doc.id == element.id){
                            var Produtos = {
                              idProduto: doc.data().id,
                              img: doc.data().img,
                              descricao: doc.data().descricao,
                              valor: doc.data().valor,
                              quantidade: element.quantidade
                            }
                            console.log(this.state.idCounter)
                            this.setState({produtos: [...this.state.produtos, {id: this.state.idCounter, idProduto: Produtos.idProduto, img: Produtos.img, descricao: Produtos.descricao, valor: Produtos.valor, quantidade: Produtos.quantidade}],idCounter: this.state.idCounter + 1})
                          
                          }
                        })
                    });
                });
            }
          })
      }
    )
  }

  atualizaBanco(obj){
    var listaAtualizada = []
    if(obj == null){
      this.state.produtos.forEach(element => {
        listaAtualizada.push({id: element.idProduto, quantidade: element.quantidade});
      });
    }
    else{
      obj.forEach(element => {
        listaAtualizada.push({id: element.idProduto, quantidade: element.quantidade});
      });
    }
    ref.collection("Carrinhos").doc(Device.osInternalBuildId.toString()+Device.modelName.toString()).update({
      "pedidos": listaAtualizada,
    });
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
        var array = [];
        this.state.produtos.forEach(element => {
          if(element.id != index){
            array.push(element);
          }
        });
        arrayProdutos = array;
        this.setState({produtos: arrayProdutos});
        console.log(this.state.produtos);
        this.atualizaBanco(arrayProdutos);
      }
      else{
        arrayProdutos[index-1].quantidade = arrayProdutos[index-1].quantidade - 1;
        this.setState({produtos: arrayProdutos});
        this.atualizaBanco(null);
      }
    }
    else{
      if(arrayProdutos[index-1].quantidade == 10){
        ToastAndroid.show("O máximo permitido são 10 unidades.", ToastAndroid.SHORT)
      }
      else{
        arrayProdutos[index-1].quantidade = arrayProdutos[index-1].quantidade + 1;
        this.setState({produtos: arrayProdutos});
        this.atualizaBanco(null);
      }
    }
  }

  comprar(){
    if(this.state.produtos.length > 0){
      this.props.navigation.navigate("TelaEntrega", {lista: this.state.produtos})
    }
    else{
      Alert.alert("Erro","Você não possui produtos no carrinho!")
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            data={this.state.produtos}
            renderItem={({item}) => <View style={[styles.view,{width: windowWidth}]}>
              
              <Image style={styles.image} source={{uri: item.img}}/>
              <View style={styles.viewText}>
                <Text style={styles.text}>{item.descricao.toUpperCase()}</Text>
                <Text style={styles.text}>R$ {item.valor}</Text>
                <Text style={styles.textQuant}>{item.quantidade} un.</Text>
              </View>
              <View style={styles.viewButtom}>
                <TouchableOpacity onPress={()=>this.quantidade(true, item.id)}>
                  <Text style={styles.positiveButtom}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.quantidade(false, item.id)}>
                  <Text style={styles.negativeButtom}>-</Text>
                </TouchableOpacity>
              </View>
            </View>}
            ListFooterComponent={
            <View>
              <Text style={styles.totalValue}>Total: {this.calcularValorTotal()}</Text>
              <TouchableOpacity style={[styles.buy,{width: windowWidth-40}]} onPress={()=>this.comprar()}>
              <View style={styles.viewBuy}>
                <Text style={styles.textBuy}>Comprar</Text>
              </View>
              </TouchableOpacity>
            </View>}
          />
        
       <BottomNavigation navigation={this.props.navigation}></BottomNavigation>
      </View>
    )
  }
}