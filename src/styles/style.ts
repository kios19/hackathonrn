import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  landingTitle: {
    marginTop: "15%",
  },
  pageDefaults: {
    paddingLeft: "5%",
  paddingRight: "5%",
    backgroundColor: "#FFf",
    height: "100%",
  },
  topbar: {
    alignItems: "center",
    justifyContent: "space-between",
    justifyItems: "center",
    marginTop: "20%",
    marginBottom: "10%",
  },
  categoriestitle: {
    marginBottom: 10,
  },
  chip: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 4,
    paddingBottom: 4,
    borderWidth: 0.5,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "grey"
  },
  cardItem:{
    width: "98%",
    height: 100,
    padding: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff'
    //width: "90%",
    //borderWidth: 5
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 0},
    shadowOpacity: 0.02,
    shadowRadius: 1,
    elevation: 1,
  },
  menuholder:{
    alignContent: 'center',
    alignItems: 'center',
  },
  loginbutton: {
    borderRadius: 10,
    marginTop: "5%",
  },
  centerhorizontal: {
    justifyContent: "center",
    width: "100%",
    marginTop: "4%",
  },
  topbbar: {
    width: "100%",
    marginTop: "50%",
    //alignItems: 'flex-end',
    flexDirection: "column",
  },
  maincontainer: {
    backgroundColor: "#Fff",
    height: "100%",
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  formcontainer: {
    marginTop: "45%",
  },
  spacer: {
    marginTop: 10,
  },
  captionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "opensans-regular",
    color: "#8F9BB3",
  },
  progressHolder: {
    marginBottom: 10,
  },
  header:{
    marginTop: 20,
    marginBottom: 10,
  },
  drawerheader:{
    marginTop: 20,
    marginBottom: 10,  
  },
  savebutton: {
    borderRadius: 10,
    marginTop: "10%",
    marginBottom: '10%'
  },
  addContainer:{
    width: "100%",
    alignItems: 'center',
    marginTop: "10%"
  },
  attributecontainer:{
    alignContent: 'center',
    alignItems: 'center'
  },

  viewdivider: {
    marginTop: 10,
    marginBottom: 10,
  },
  addType:{
    alignItems: 'center',
    marginBottom: 10,
  },
  empty:{
    alignContent: 'center',
    width: "100%",
    alignItems: 'center',
    marginTop: '10%'
  },
  attributebox: {
    marginTop: 10,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 10,
  },
  closebar:{
    width: "80%",
    justifyContent:'space-between',
    alignItems: "center",

  }
});

export default styles;