import React, { useState, useEffect,useContext } from "react";
import { 
  View, 
  Text, StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  Button,
  TouchableOpacity,Linking, Platform  } from 'react-native';
  import axios  from "axios";
import EasyButton from "../../components/UI/EasyButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";
import {baseURL} from "../../../BaseUrl";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Card from "../../components/UI/Card";
import { Video } from 'expo-av';




const screenWidth = Dimensions.get('window').width;

const PropertyDetails = (props) => {
  const context = useContext(AuthGlobal)
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const tolet= props.route.params.item;
  console.log(tolet.video);

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
      <ScrollView  >
        <View style={{flex: 1,alignItems:"center",}}>
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
            Net Rent: {tolet.net_rent}৳
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
          <MatIcon name="office-building" color="grey" size={22} />
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
          }}><MatIcon name="toilet" color="gray" size={24} />{tolet.bath_room}
          </Text>

        </View>
               <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
          <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            color: '#000000',
            fontSize:18,
            fontWeight:"bold",
          }}>
          <MatIcon name="vector-square" color="gray" size={24} />
          {tolet.floor_space} Sq.Ft
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
            <Text style={{fontSize: 18, color: "black"}}>Main Information</Text>
            <Text style={{fontSize: 12, color: "black", marginTop: 4}}>
              {tolet.description}
            </Text>
        </View>

      <Card>
        <View style={{
            // width: "90%",
            // backgroundColor:"#778899",
            marginTop: 10,
            alignItems:"center"
        }}>
          
          <Text style={{fontSize:22, fontWeight: "bold",color:"grey"}}>Sorrounding & Distance</Text>
        </View>
     <View style={styles.PriceContainer}>
        <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
         <Text style={{
            color: '#f8f8ff',
            fontSize:16,
            fontWeight:"bold",
         }}>
            Public Transport: {tolet.data1}m
          </Text>
          </View>
         <View style={{ overFlow: "hidden", paddingHorizontal:10}}> 
          <Text style={{
            color: '#f0f8ff',
            fontSize:14,
            fontWeight:"bold",
         }}>
            Shopping Transport: {tolet.data2}m
          </Text>
        </View>
      </View>
      <View style={styles.distanceContainer}>
        <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
         <Text style={{
            color: '#696969',
            fontSize:16,
            fontWeight:"bold",
         }}>
            Kender Garten: {tolet.data3}m
          </Text>
          </View>
         <View style={{ overFlow: "hidden", paddingHorizontal:10}}> 
          <Text style={{
            color: '#696969',
            fontSize:14,
            fontWeight:"bold",
         }}>
          Primary School: {tolet.data4}m
          </Text>
        </View>
      </View>
      <View style={styles.PriceContainer}>
        <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
         <Text style={{
            color: '#f8f8ff',
            fontSize:16,
            fontWeight:"bold",
         }}>
            Secondary School: {tolet.data5}m
          </Text>
          </View>
         <View style={{ overFlow: "hidden", paddingHorizontal:10}}> 
          <Text style={{
            color: '#f0f8ff',
            fontSize:14,
            fontWeight:"bold",
         }}>
            Motor Way: {tolet.data5}m
          </Text>
        </View>
      </View>
      </Card>





      <Card>
        <View style={{
            marginTop: 10,
            alignItems:"center"
        }}>
          
          <Text style={{fontSize:18, fontWeight: "bold",color:"grey"}}>Contact Information</Text>
        </View>
        
        <View style={ {
            width: screenWidth,
            justifyContent: "center",
            alignContent: "center",
            padding:5,
          }}>
          <View style={{ alignItems:"center", paddingHorizontal:10}}>
        <Text style={{
            color: "#696969",
            fontSize: 22,
            fontWeight: "bold",
          }}>
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

      <Card>
        
        <View style={{ justifyContent:"center",alignItems:"center",paddingHorizontal:10, backgroundColor:"#f5f5dc",marginBottom:20}}>
          <View style={{
            width: screenWidth,
            // backgroundColor:"#778899",
            marginTop: 10,
            alignItems:"center"
        }}>
          <Text style={{fontSize:18, fontWeight: "bold",color:"grey"}}>Billing Information</Text>
        </View>
         <Text style={styles.text2}>
          Name: {tolet.full_name}
        </Text>
         <Text style={styles.text2}>
          Email: {tolet.email_for_interview}
        </Text>
        <Text style={styles.text2}>
          Mobile: {tolet.billing_mobile}
        </Text>
         <Text style={styles.text}>
          Address: {tolet.complete_address}
        </Text>
       </View>
      </Card>
      
      </View>

      <Card>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause Video' : 'Play Video'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
       </View>
      </Card>
       </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Propety Details",
  };
};

const styles = StyleSheet.create({
    Container: { 
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
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
    color: "#696969",
    fontSize: 16,
    fontWeight: "bold",
  },
  text2: {
    color: "#696969",
    fontSize: 22,
    fontWeight: "bold",
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
    fontSize:16,
    fontWeight:"bold",
  },
  PriceContainer: {
     width: screenWidth,
     flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding:5,
    backgroundColor:"#778899"
  },
  distanceContainer: {
     width: screenWidth,
     flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding:5,
    backgroundColor:"#dcdcdc"
  },
  titleContainer: {
     width: screenWidth,
    justifyContent: "center",
    alignContent: "center",
  },
  promptDes: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: screenWidth,
    elevation: 1,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    backgroundColor: 'white',
    },

   video: {
    alignSelf: 'center',
    width: screenWidth,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:20
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


export default PropertyDetails;

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const PropertyDetails = ({ }) => {
//   return (
//        <View style={styles.Container}>
//           <Text>this property details screen</Text>
//         </View>
//   );
// };

// const styles = StyleSheet.create({
//     Container: {
//      flex:1,
//      justifyContent:"center",
//      alignItems:"center"
//      },
// });

// export default PropertyDetails;