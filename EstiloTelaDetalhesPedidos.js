import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    text:{
      fontSize: 26, 
      marginHorizontal: 20,
      marginVertical: 15
    },
    contentContainerStyle:{
      display: "flex",
      flexDirection: "row",
      flexWrap: 'wrap',
      paddingBottom: 70
    },
    view:{
      height:200, 
      padding: 20, 
      paddingTop: -15, 
      flexDirection: 'row', 
      flex: 1
    },
    image:{
      width: "45%", 
      height: "80%", 
      marginVertical: 20
    },
    viewText:{
      flexDirection: 'column', 
      marginLeft: 20, 
      marginTop: 30
    },
    textInfo:{
      fontSize: 20, 
      fontWeight: 'bold', 
      color: 'rgb(189,0,0)'
    },
    quant:{
      fontSize: 20, 
      marginTop: 20
    },
    value:{
      fontSize: 30, 
      fontWeight: 'bold', 
      color: 'rgb(189,0,0)', 
      textAlign: 'right', 
      marginRight: 20, 
      marginTop: 20
    },
    buttom:{
      marginHorizontal: 20, 
      marginVertical: 20
    },
    viewButtom:{
      height: 50, 
      backgroundColor: "rgb(189,0,0)", 
      justifyContent: 'center'
    },
    textButton:{
      fontSize: 26, 
      textAlign: 'center', 
      color: "rgb(214,192,0)"
    }
  });

export default styles;