import React, { useState, useEffect,useContext } from "react";
import { View, Text, StyleSheet, ScrollView ,ImageBackground,TouchableOpacity, Dimensions,Linking, Platform  } from 'react-native';
import Card from "../../components/UI/Card";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";



const screenWidth = Dimensions.get('window').width;

const TutorDetailScreen = (props) => {
  const context = useContext(AuthGlobal)
  const data= props.route.params.item;

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
        phoneNumber = `tel:${data.mobile}`;
      }
      else {
        phoneNumber = `telprompt:${data.mobile}`;
      }
      Linking.openURL(phoneNumber);
    };


  return (
   <ScrollView>
       <View style={styles.Container}>
         <ImageBackground source={{uri: data.idCard}}
         style={{
             width: screenWidth,
             height: 190,
             alignItems: 'center',
             justifyContent: "space-evenly",
             paddingTop: 110 
         }}>
        </ImageBackground>
         <Text style={{
             color: "#696969",
            fontSize: 28,
            fontWeight: "bold",
        }}>{data.name}</Text>
         <Text style={styles.text}>{data.institute}</Text>


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
            color: "#228b22",
            fontSize:14,
            fontWeight:"bold",
         }}>
          Expected Salary: {data.salary}
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
            color: "#228b22",
            fontSize:14,
            fontWeight:"bold",
         }}>
          {data.day} days per week
          </Text>
        </View>
      </View>
    </View>

   <View style={{
        width: screenWidth,
          justifyContent: "center",
          alignItems:"center",
          padding:5,
          backgroundColor:"#dcdcdc"
      }}>
        <View style={{ paddingHorizontal:10}}> 
          <Text style={{
            color: "#228b22",
            fontSize:14,
            fontWeight:"bold",
         }}>
          {data.experience} years of experience in tutoring
          </Text>
        </View>
      </View>
 </View>


    <View style={styles.detailContainer}>
        <Text style={ {
            color: "black",
            fontSize:19
          }}>
          <Icon name="location" color="red" size={28} />
            {data.location}
          </Text>
        
      </View>
        <View style={styles.promptDes}>
            <Text style={{fontSize: 18,fontWeight:"bold", color: '#696969'}}>Interested Tutoring location</Text>
            <Text style={{fontSize: 16, color: "black", marginTop: 4}}>
              {data.tutoringLocation}
            </Text>
        </View>




<Card>
  <Text style={{fontSize: 18, fontWeight: "bold",marginHorizontal: 5,}}>Expert in Following Subjects</Text>
  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {data.expertSubs.map((x, y) => {
             return (
                 <TouchableOpacity key={y}
                      style={{
                          height: 30,
                          backgroundColor: "#DD502C",
                          paddingHorizontal: 8,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius:25,
                          marginVertical: 5,
                          marginHorizontal: 5,
                          borderWidth: 1
                      }}>
                     <Text style={{color:'#f3f3f3'}}>{x.title}</Text>

                 </TouchableOpacity>
             );
            })
        }
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
   </ScrollView>
  );
};

const styles = StyleSheet.create({
    Container: { 
      paddingTop:50,
     flex:1,
     justifyContent:"center",
     alignItems:"center"
    },
  detailContainer: {
     width: screenWidth,
     flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    marginLeft: 3,
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
text: {
    color: "#696969",
    fontSize: 19,
    fontWeight: "bold",
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

export default TutorDetailScreen;