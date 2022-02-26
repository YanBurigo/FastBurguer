import React, { Component } from 'react';
import {View, Text, SafeAreaView , Image, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import styles from './EstiloTelaCompras';
import { LogBox } from 'react-native';
import BottomNavigation from './BottomNavigation';
import firebase from './Firebase';

const windowWidth = Dimensions.get('window').width;
const ref = firebase.firestore();

export default class TelaCompras extends Component {
  constructor(props){
    super(props);
    LogBox.ignoreAllLogs();
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
    
    this.state = {produtos: []}

    this.buscarDados();
  }
  
  buscarDados(){
    ref.collection('Produtos').get().then(
      snapshot => {
          snapshot.forEach(doc => {
              var Produtos = {
                id: doc.data().id,
                img: doc.data().img,
                descricao: doc.data().descricao,
                valor: doc.data().valor
              }
              this.setState({produtos: [...this.state.produtos, {id: Produtos.id, img: Produtos.img, descricao: Produtos.descricao, valor: Produtos.valor}]})
              console.log(Produtos)
          })
      }
    )
  }

  render() {
    return(
      <SafeAreaView  style={styles.container}>
        <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            data={this.state.produtos}
            renderItem={({item}) => <View style={[styles.view, {width: (windowWidth/2)}]}>
              <TouchableOpacity style={styles.buttom} onPress={() => this.props.navigation.navigate("TelaAdicionarCarrinho", {produto: item})}>
                <Image style={styles.image} source={{uri: item.img}}/>
                <Text style={styles.text}>{item.descricao.toUpperCase()}</Text>
                <Text style={styles.text}>R$ {item.valor}</Text>
              </TouchableOpacity>
            </View>}
          />
          <BottomNavigation navigation={this.props.navigation}></BottomNavigation>
      </SafeAreaView>
    )
  }
}