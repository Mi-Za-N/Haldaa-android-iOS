import React from "react";
import { View,
  Text,
  FlatList,
  Modal, 
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  TouchableNativeFeedback,
  ScrollView,
  Dimensions,
  Linking

} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const { width, height } = Dimensions.get('window');


const PopUpModal = (props) => {

    let TouchableComp = TouchableOpacity;

    if (Platform.OS === "android" && Platform.Version >= 21) {
      TouchableComp = TouchableNativeFeedback;
    }



  return (
    <Modal transparent visible={props.visible} animationType="fade">
      <View style={styles.ModalView}>
      <View style={styles.ModalHeight}>
        <View style={styles.buttonContainer}>
            {/* <Ionicons name={
                Platform.OS === "android"
                  ? "md-close-circle-outline" : "ios-close"}
              size={40}
              color="red"
              style={styles.closeIcon}
              onPress={props.onCancel}
            /> */}
          </View>
              <View style={{
                flex:1,
                justifyContent:"center",
                alignItems:"center",
              }}>
                <Text style={{color:"white",fontSize:18, fontWeight:"700"}}>
                  For Better experience
                </Text>
                <Text style={{color:"white",fontSize:18, fontWeight:"700"}}>
                  please reinstall our Halda app.</Text>

                  <Text style={{color: 'blue', fontSize:22,marginTop:20}}
                        onPress={() => Linking.openURL('http://google.com')}>
                    Google Play Store
                  </Text>
              </View>
        </View>
       </View>
    </Modal>    
  );
};

export const screenOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  ModalView: { 
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  ModalHeight: {
  width: "90%",
  height: "32%",
  borderRadius:30,
  backgroundColor: "#000000"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  closeIcon: {
    // backgroundColor: "red",
    paddingHorizontal: 8,
    borderRadius: 60
  },
  screen: {
    flex:1, 
    marginLeft:40,
    justifyContent:"flex-start",
    alignItems:"flex-start"
    // paddingHorizontal: 10,
    
  },
  center: {
    fontSize:16,
    fontWeight:"bold",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.white,
  },
  button: {
    height: 35,
    width:110,
    marginTop:10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius:10,
  },




    GridItem: {
    flex: 1,
    margin: 5,
    height: 99,
    borderRadius: 10,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    elevation: 5,
    backgroundColor:"white"
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 12,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  image:{
   width:60,
   height:60
  },
  title: {
    fontSize: 19,
    textAlign: "right",
  },
  ImgContainer: {
    width: 130, 
    height: 60, 
    resizeMode: 'contain',
    borderRadius: 10,
  }
});

export default PopUpModal;
