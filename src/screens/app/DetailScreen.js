import React, { useState, useEffect,useContext } from "react";
import { 
  View, 
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Button,
  Linking, Platform 
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Card from "../../components/UI/Card";
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";
import Toast from "react-native-toast-message";



const screenWidth = Dimensions.get('window').width;

const DetailScreen = (props) => {
  const context = useContext(AuthGlobal)
  const tolet= props.route.params.item;
  // console.log("tolet",tolet);

    useEffect(() => {
      if(!context.stateUser.isAuthenticated){
        setTimeout(() => {
           Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Please Sign up Now",
             text2: "Great to see you here, Thanks",
          });
            props.navigation.navigate("Sign Up");
          }, 2000);
      }
    },[context.stateUser.isAuthenticated]);

    const dialCall = () => {
      let phoneNumber = '';
  
      if (Platform.OS === 'android') {
        phoneNumber = `tel:${tolet.mobile}`;
      }
      else {
        phoneNumber = `telprompt:${tolet.mobile}`;
      }
      Linking.openURL(phoneNumber);
    };

    return (
        <View style={{flex: 1,paddingTop:40, alignItems:"center"}}>
        <ImageBackground source={{uri: tolet.image}}
                  style={{
                      width: screenWidth,
                      height: 190,
                      // alignItems: 'center',
                      justifyContent: "space-evenly",
                      paddingTop: 110 
                  }}>
        </ImageBackground>
        <Text style={styles.text}>
            {tolet.title}
          </Text>
      <View style={styles.PriceContainer}>
        <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
         <Text style={{
            color: '#f8f8ff',
            fontSize:16,
            fontWeight:"bold",
         }}>
            Net Rent: {tolet.rent}৳
          </Text>
          </View>
         <View style={{ overFlow: "hidden", paddingHorizontal:10}}> 
          <Text style={{
            color: '#f0f8ff',
            fontSize:14,
            fontWeight:"bold",
         }}>
            Extra Cost: {tolet.additional_expenses}৳
          </Text>
        </View>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.date}>
          <MatIcon name="office-building" color="red" size={22} />
            Floor:{tolet.floor}th
          </Text>
        <View style={{ overFlow: "hidden",paddingHorizontal:10}}>
          <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            color: '#000000',
            fontSize:22,
            fontWeight:"bold",
          }}><Icon name="ios-bed-outline" color="gray" size={28} />
          {tolet.bed}</Text>
        </View>
        <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
          <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            color: '#000000',
            fontSize:22,
            fontWeight:"bold",
          }}><MatIcon name="toilet" color={`${tolet.isAttachedBath ===true? "red" : "#dcdcdc"}`} size={24} />
          </Text>

        </View>
               <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
          <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            color: '#000000',
            fontSize:22,
            fontWeight:"bold",
          }}>
          <MatIcon name="wifi" color={`${tolet.isWifi ===true? "red" : "#dcdcdc"}`} size={24} />
          </Text>

        </View>
      </View>
    <View style={styles.detailContainer}>
        <Text style={ {
            color: "black",
            fontSize:19
          }}>
          <Icon name="location" color="red" size={28} />
            {tolet.location}
          </Text>
        {/* <View style={{ overFlow: "hidden",paddingHorizontal:10}}>
          <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            color: '#000000',
            fontSize:16,
            fontWeight:"bold",
          }}> {tolet.bed}</Text>
        </View> */}
        {/* <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
          <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            color: '#000000',
            fontSize:16,
            fontWeight:"bold",
          }}>Floor:{tolet.floor}th</Text>

        </View> */}
      </View>

        <View style={styles.promptDes}>
            <Text style={{fontSize: 18,fontWeight:"bold", color: '#696969'}}>Details Information</Text>
            <Text style={{fontSize: 16, color: "black", marginTop: 4}}>
              {tolet.room}
            </Text>
        </View>

      <Card>
         <View style={ {
            width: screenWidth,
            justifyContent: "center",
            alignContent: "center",
            padding:5,
          }}>
         <View style={{
              marginTop: 10,
              justifyContent:"center",
              alignItems:"center"
          }}>
          
          <Text style={{fontSize:18, fontWeight: "bold",color:"grey"}}>Contact Information</Text>
        </View>
        <View style={{
              marginTop: 10,
              justifyContent:"center",
              alignItems:"center"
          }}>
         <Text style={styles.text}>
          Name: {tolet.full_name}
        </Text>
        </View>

      <View style={styles.MainContainer}>
        <TouchableOpacity onPress={dialCall} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}>call</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={dialCall} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}>whatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
      </Card>
      
      </View>
  );
};

const styles = StyleSheet.create({
    Container: { 
      flex: 1,
      marginTop:30,
      justifyContent: "center",
      alignItems: "center",
    },
    row: {
    paddingVertical:10,
    flexDirection: "row",
    width: "90%"
  },
  inputWrap: {
    flex: 1,
    borderColor: "#000",
    // borderBottomWidth: 1,
    // marginBottom: 10
  },
  inputdate: {
    fontSize: 14,
    marginBottom: -12,
    color: "#6a4595"
  },
  inputcvv: {
    fontSize: 14,
    marginBottom: -12,
    color: "#6a4595"
  },
  label: {
    width: "80%",
    marginTop: 10,
    paddingHorizontal: 5
  },
  ButtonContainer: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",

  },
  buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16
    },
 text: {
    padding: 5,
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    overflow: "hidden",
  },
    buttonRow: {
    paddingVertical:10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    // width: "95%"
    },
    desContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      borderEndColor: "#000",
      // borderBottomWidth: 2
      marginHorizontal: 10
    },
    detailContainer: {
     width: screenWidth,
     flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    marginLeft: 3,
  },
 date: {
    color: "black",
    fontSize:16
  },
  PriceContainer: {
     width: screenWidth,
     flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding:5,
    backgroundColor:"#778899"
  },
  titleContainer: {
     width: screenWidth,
    justifyContent: "center",
    alignContent: "center",
  },

  MainContainer: {
    flexDirection:"row",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal:20,
    paddingVertical:20,
  },
  button: {
    width: 120,
    padding: 6,
    backgroundColor: "#006400",
    borderRadius: 7,
  },
 
  TextStyle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  }
 

});


export default DetailScreen;