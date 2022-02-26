import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    contentContainerStyle:{
      display: "flex",
      paddingBottom: 100
    },
    buttom:{
      flexDirection:'row', 
      justifyContent: 'space-between'
    },
    textButtom:{
      fontSize: 26, 
      marginHorizontal: 40, 
      marginTop: 40
    },
    imageButtom:{
      width: 50, 
      aspectRatio: 1, 
      marginTop: 30,
      marginHorizontal: 40
    }
});

export default styles;