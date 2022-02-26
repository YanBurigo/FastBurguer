import React, { Component } from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import styles from './EstiloBottomNavigation';

export default class BottomNavigation extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return(
      <View style={styles.container}>
          <View style={styles.view}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("TelaInicial")}>
              <Image source={require("./assets/compras.png")} style={styles.options}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("TelaCarrinho")}>
              <Image source={require("./assets/carrinho.png")} style={styles.options}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("TelaPedidos")}>
              <Image source={require("./assets/pedidos.png")} style={styles.options}></Image>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}