import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(242,242,242,1)',
      borderWidth: 0.5
    },
    viewImage:{
      width: "100%", 
      height: "50%",
      padding: 20
    },
    image: {
      width: "100%", 
      height: "100%"
    },
    viewText:{
      width: "100%", 
      height: "20%"
    },
    text: {
      textAlign: 'center', 
      color: 'rgb(189,0,0)', 
      fontSize: 24
    },
    viewQuant: {
      flexDirection: 'row', 
      alignSelf: 'center'
    },
    negativeButtom: {
      textAlign: 'center', 
      fontSize: 36, 
      paddingTop: 10, 
      marginHorizontal: 20
    },
    quant: {
      textAlign: 'center', 
      fontSize: 24, 
      paddingTop: 20
    },
    positiveButtom:{
      textAlign: 'center', 
      fontSize: 24, 
      paddingTop: 20, 
      marginHorizontal: 20
    },
    buttom:{
      marginHorizontal: 20, 
      marginBottom: 10
    },
    viewButtom:{
      height: 50, 
      backgroundColor: "rgb(189,0,0)", 
      justifyContent: 'center'
    },
    textButtom:{
      fontSize: 26, 
      textAlign: 'center', 
      color: "rgb(214,192,0)"
    }
  });

export default styles;