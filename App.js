import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import TelaCompras from './TelaCompras';
import TelaAdicionarCarrinho from './TelaAdicionarCarrinho';
import TelaCarrinho from './TelaCarrinho';
import TelaEntrega from './TelaEntrega';
import TelaPedidos from './TelaPedidos';
import TelaDetalhesPedidos from './TelaDetalhesPedidos';
import {decode, encode} from 'base-64'

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TelaInicial">
          <Stack.Screen name="TelaInicial" component={TelaCompras} />
          <Stack.Screen name="TelaAdicionarCarrinho" component={TelaAdicionarCarrinho} />
          <Stack.Screen name="TelaCarrinho" component={TelaCarrinho} />
          <Stack.Screen name="TelaEntrega" component={TelaEntrega} />
          <Stack.Screen name="TelaPedidos" component={TelaPedidos} />
          <Stack.Screen name="TelaDetalhesPedidos" component={TelaDetalhesPedidos} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}