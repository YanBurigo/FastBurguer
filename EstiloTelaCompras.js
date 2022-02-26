import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    contentContainerStyle:{
      display: "flex",
      flexDirection: "row",
      flexWrap: 'wrap',
      paddingBottom: 70
    },
    view:{
      aspectRatio: 1, 
      padding: 20
    },
    buttom:{
      width: "100%", 
      height: "100%"
    },
    image:{
      width: "100%", 
      height: "80%"
    },
    text:{
      fontSize: 20, 
      textAlign: 'center', 
      fontWeight: 'bold', 
      color: 'rgb(189,0,0)'
    }
  });

export default styles;