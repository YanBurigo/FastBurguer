import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242,242,242,1)',
    borderWidth: 0.5,
  },
  viewAll:{
    marginTop: 30
  },
  view:{
    flexDirection: "row",
    margin: 10
  },
  textLabel:{
    flex: 2,
    fontWeight: "bold",
    fontSize: 16,
  },
  input:{
    flex: 3,
    borderWidth: 2,
    paddingHorizontal: 10
  },
  scrollView:{
    marginBottom: 70
  },
  title:{
    fontSize: 26, 
    fontWeight: 'bold', 
    marginLeft: 10, 
    marginBottom: 20
  },
  buttomEnd:{
    marginHorizontal: 20,
    marginBottom: 10, 
    marginTop: 40
  },
  buttomBack:{
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