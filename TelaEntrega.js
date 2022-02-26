import React, { Component } from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert, ScrollView, Dimensions} from 'react-native';
import styles from './EstiloTelaEntrega';
import firebase from './Firebase';
import BottomNavigation from './BottomNavigation';
import * as Device from 'expo-device';

const ref = firebase.firestore();

export default class TelaEntrega extends Component {
  constructor(props){
    super(props);
    this.state = {cep: '',
                  logradouro: '',
                  cidade: '',
                  estado: '',
                  numero: '',
                  complemento: '', 
                  id: 0};

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
  }

  salvar(){
    if(this.state.cep != '' && this.state.logradouro != '' && this.state.cidade != '' && this.state.estado != '' && this.state.numero != '' && this.state.complemento != ''){
      ref.collection("Enderecos").doc(Device.osInternalBuildId.toString()+Device.modelName.toString()).set({
        cep: this.state.cep,
        logradouro: this.state.logradouro,
        cidade: this.state.cidade,
        estado: this.state.estado,
        numero: this.state.numero,
        complemento: this.state.complemento
      });

      this.props.route.params.lista.forEach(element => {
        delete element.id;
        delete element.idProduto;
      });

      ref.collection('Pedidos').get().then(
        snapshot => {
            snapshot.forEach(doc => {
              if(doc.id.includes(Device.osInternalBuildId.toString()+Device.modelName.toString())){
                this.setState({id: doc.id.split(";")[1]});
              }
            })
            var novoId = parseInt(this.state.id) + 1;
            ref.collection("Pedidos").doc(Device.osInternalBuildId.toString()+Device.modelName.toString()+";"+novoId).set({
              pedidos: this.props.route.params.lista
            });
            ref.collection("Carrinhos").doc(Device.osInternalBuildId.toString()+Device.modelName.toString()).delete();
            this.props.navigation.navigate("TelaCarrinho", {comprado: true});
            this.props.navigation.navigate("TelaPedidos");
          }
      );
    }else{
      Alert.alert("Alert!","Preencha todos os campos!");
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.viewAll}>
            <Text style={styles.title}>Endereço de entrega:</Text>
            <View style={styles.view}>
              <Text style={styles.textLabel}>CEP:</Text>
              <TextInput style={styles.input} value={this.state.cep} onChangeText={(value)=>this.setState({cep: value})} />
            </View>
            <View style={styles.view}>
              <Text style={styles.textLabel}>Logradouro:</Text>
              <TextInput style={styles.input} value={this.state.logradouro} onChangeText={(value)=>this.setState({logradouro: value})} />
            </View>
            <View style={styles.view}>
              <Text style={styles.textLabel}>Cidade:</Text>
              <TextInput style={styles.input} value={this.state.cidade} onChangeText={(value)=>this.setState({cidade: value})} />
            </View>
            <View style={styles.view}>
              <Text style={styles.textLabel}>Estado:</Text>
              <TextInput style={styles.input} value={this.state.estado} onChangeText={(value)=>this.setState({estado: value})} />
            </View>
            <View style={styles.view}>
              <Text style={styles.textLabel}>Número:</Text>
              <TextInput style={styles.input} value={this.state.numero} onChangeText={(value)=>this.setState({numero: value})} />
            </View>
            <View style={styles.view}>
              <Text style={styles.textLabel}>Complemento:</Text>
              <TextInput style={styles.input} value={this.state.complemento} onChangeText={(value)=>this.setState({complemento: value})} />
            </View>
            <TouchableOpacity style={styles.buttomEnd} onPress={()=>this.salvar()}>
            <View style={styles.viewButtom}>
              <Text style={styles.textButtom}>Finalizar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttomBack} onPress={()=>this.props.navigation.goBack()}>
            <View style={styles.viewButtom}>
              <Text style={styles.textButtom}>Voltar</Text>
            </View>
          </TouchableOpacity>
          </View>
         </ScrollView>
         <BottomNavigation navigation={this.props.navigation}></BottomNavigation>
      </View>
    )
  }
}