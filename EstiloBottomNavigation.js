import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      position: 'absolute', 
      left: 0, 
      right: 0, 
      bottom: 0
    },
    view:{
      backgroundColor: 'rgb(189,0,0)', 
      height: 60, 
      flexDirection:'row', 
      justifyContent:'space-around', 
      alignItems:'center'
    },
    options:{
      width:50, 
      height: 50
    }
  });

export default styles;