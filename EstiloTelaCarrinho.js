import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container:{
    flex: 1
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
    flexDirection: 'row', 
    flex: 1
  },
  image:{
    width: "45%", 
    height: "80%",
    marginVertical: 20, 
    flex: 3
  },
  viewText:{
    flexDirection: 'column', 
    marginLeft: 20,
    marginTop: 30, 
    flex: 2
  },
  text:{
    fontSize: 20, 
    fontWeight: 'bold', 
    color: 'rgb(189,0,0)'
  },
  textQuant:{
    fontSize: 20, 
    marginTop: 20
  },
  viewButtom:{
    alignItems: 'flex-end', 
    marginLeft: 20, 
    marginTop: 20, 
    flex: 1
  },
  positiveButtom:{
    fontSize: 30, 
    fontWeight: 'bold', 
    color: 'rgb(189,0,0)', 
    marginBottom: 40
  },
  negativeButtom:{
    fontSize: 40, 
    fontWeight: 'bold', 
    color: 'rgb(189,0,0)'
  },
  totalValue:{
    fontSize: 30, 
    fontWeight: 'bold', 
    color: 'rgb(189,0,0)', 
    textAlign: 'right', 
    marginRight: 20, 
    marginTop: 20
  },
  buy:{
    marginHorizontal: 20, 
    marginVertical: 20
  },
  viewBuy:{
    height: 50, 
    backgroundColor: "rgb(189,0,0)", 
    justifyContent: 'center'
  },
  textBuy:{
    fontSize: 26, 
    textAlign: 'center', 
    color: "rgb(214,192,0)"
  }
});

export default styles;