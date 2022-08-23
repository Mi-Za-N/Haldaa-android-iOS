import React, { useState, useEffect,useContext } from "react";
import { 
  View, 
  Text, StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  Button,
  TouchableOpacity,
  Linking, Platform } from 'react-native'; 
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

const RentDetails = (props) => {
    const context = useContext(AuthGlobal)
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const rent= props.route.params.item;
  // console.log("rent",rent);


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
        phoneNumber = `tel:${rent.mobile}`;
      }
      else {
        phoneNumber = `telprompt:${rent.mobile}`;
      }
  
      Linking.openURL(phoneNumber);
    };

    return (
      <ScrollView  >
        <View style={{flex: 1,alignItems:"center", paddingTop:50,}}>
        <ImageBackground source={{uri: rent.image}}
                  style={{
                      width: screenWidth,
                      height: 190,
                      // alignItems: 'center',
                      justifyContent: "space-evenly",
                      paddingTop: 110 
                  }}>
        </ImageBackground>
        <Text style={styles.text}>
            {rent.title}
          </Text>
      <View style={{
          width: screenWidth,
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          padding:5,
          backgroundColor:"#708090"
        }}>
        <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
         <Text style={{
            color: '#f8f8ff',
            fontSize:16,
            fontWeight:"bold",
         }}>
            Net Rent: {rent.flatRent}৳
          </Text>
          </View>
         <View style={{ overFlow: "hidden", paddingHorizontal:10}}> 
          <Text style={{
            color: '#f5deb3',
            fontSize:14,
            fontWeight:"bold",
         }}>
            Extra Cost: {rent.additional_expenses}৳
          </Text>
        </View>
      </View>

          <Text style={styles.date}>
          <MatIcon name="vector-square" color="#ffd700" size={22} />
             Volume:{rent.volume} Sq.Ft
          </Text>

      <View style={styles.detailContainer}>
        <View style={{ overFlow: "hidden",paddingHorizontal:10}}>
          <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
             color: '#696969',
            fontSize:16,
            fontWeight:"bold",
          }}>BED<Icon name="ios-bed-outline" color="#4b0082" size={22} />
          {rent.bed}</Text>
        </View>
        <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
          <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
             color: '#696969',
            fontSize:16,
            fontWeight:"bold",
          }}>BATH<MatIcon name="toilet" color="#4b0082" size={22} />{rent.bath}
          </Text>

        </View>
               <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
          <Text style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            color: '#696969',
            fontSize:16,
            fontWeight:"bold",
          }}>
         RoomHeight <MatIcon name="office-building" color="#4b0082" size={22} />
          {rent.roomHeigh} Ft
          </Text>

        </View>
      </View>
    <View style={styles.detailContainer}>
        <Text style={ {
            color: "black",
            fontSize:19
          }}>
          <Icon name="location" color="red" size={28} />
            {rent.location}
          </Text>
        
      </View>
        <View style={styles.promptDes}>
            <Text style={{fontSize: 18,fontWeight:"bold", color: '#696969'}}>Details Information</Text>
            <Text style={{fontSize: 16, color: "black", marginTop: 4}}>
              {rent.description}
            </Text>
        </View>

      <Card>
      <View style={{
          width: screenWidth,
          flexDirection: "row",
          justifyContent: "space-around",
          alignContent: "center",
          padding:5,
        }}>
        <View style={{
             width: screenWidth/2.2,
          // flexDirection: "row",
          // justifyContent: "center",
          alignContent: "stretch",
          padding:5,
          backgroundColor:"#dcdcdc"
      }}>
        <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
         <Text style={{
            color: rent.isLift===true? "#228b22": "#ff0000",
            fontSize:18,
            fontWeight:"bold",
         }}>
            Lift: {rent.isLift===true? "Available " : "Unavailable"}
          </Text>
          </View>
      </View>
      <View style={{
             width: screenWidth/2,
          // flexDirection: "row",
          // justifyContent: "center",
          alignContent: "stretch",
          padding:5,
          backgroundColor:"#dcdcdc"
      }}>
        <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
         <Text style={{
            color: rent.isGenerator===true? "#228b22": "#ff0000",
            fontSize:16,
            fontWeight:"bold",
         }}>
            Generator: {rent.isGenerator===true ? "Available":"Unavailable"}
          </Text>
          </View>
      </View>
    </View>

      <View style={{
          width: screenWidth,
          flexDirection: "row",
          justifyContent: "space-around",
          alignContent: "center",
          padding:5,
        }}>
      <View style={{
             width: screenWidth/2.2,
          // flexDirection: "row",
          // justifyContent: "center",
          alignContent: "stretch",
          padding:5,
          backgroundColor:"#dcdcdc"
      }}>
        <View style={{ overFlow: "hidden", paddingHorizontal:10}}> 
          <Text style={{
            color: rent.isBachelor===true? "#228b22": "#ff0000",
            fontSize:16,
            fontWeight:"bold",
         }}>
          Bachelor: {rent.isBachelor===true ? "Allow":"Not allow"}
          </Text>
        </View>
      </View>

        <View style={{
             width: screenWidth/2,
          // flexDirection: "row",
          // justifyContent: "center",
          alignContent: "stretch",
          padding:5,
          backgroundColor:"#dcdcdc"
      }}>
        <View style={{ paddingHorizontal:10}}> 
          <Text style={{
            color: rent.pipelineGas===true? "#228b22": "#ff0000",
            fontSize:16,
            fontWeight:"bold",
         }}>
          Line Gas: {rent.pipelineGas===true ? "Available":"Unavailable"}
          </Text>
        </View>
      </View>
    </View>
      </Card>





      <Card>
        <View style={{
            marginTop: 10,
            alignItems:"center"
        }}>
          
          <Text style={{fontSize: 18, fontWeight: "bold",color:"grey"}}>Contact Information</Text>
        </View>
        
        <View style={ {
            width: screenWidth,
            // flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            padding:5,
            // backgroundColor:"#778899"
          }}>
          <View style={{ alignItems:"center", paddingHorizontal:10}}>
        <Text style={{
          color: "#696969",
          fontSize: 22,
          fontWeight: "bold",
        }}>
          Name: {rent.fullName}
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

    <Card>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
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
    color: "#696969",
    fontSize:22,
    fontWeight:"bold",
  },
  PriceContainer: {
     width: screenWidth,
     flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding:5,
    backgroundColor:"#dcdcdc"
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
    flex: 1,
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


export default RentDetails;
