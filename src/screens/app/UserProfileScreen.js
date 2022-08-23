import React, { useState,useContext,useEffect,useCallback } from 'react';
import { View, Text, StyleSheet, Image, Dimensions,FlatList,ScrollView,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/Colors';
import axios  from "axios";
import {baseURL} from "../../../BaseUrl";
import { logoutUser } from "../../contexts/auth/actions/Auth.actions";
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";
import Icon from "react-native-vector-icons/FontAwesome";
import {Button} from '../../components/UI/Button';
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import OrderCard from "../../components/shop/OrderCard";


const screenWidth = Dimensions.get('window').width;


const UserProfileScreen = (props) => {
  const context = useContext(AuthGlobal)
  const showEvents = useAppState("showUserEvent");
  const [show, setShow] = useState(false);
  const [userProfile, setUserProfile] = useState()
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState([]);



  // console.log(context.stateUser.user.id);

  
    useEffect(() => {
     axios.get(`${baseURL}users/${context.stateUser.user.id}`)
      .then((res) => {
        setUserProfile(res.data);
      })
      .catch((error) => {
        console.log('Api call error');
         setError(true)
      });

      axios.get(`${baseURL}api/user/orders`)
        .then((x) => {
          const data = x.data;
          // const userOrders = data.filter(
          //   (order) => order.user._id === context.stateUser.user.id
          // );
          // setOrders(userOrders);
          setOrders(x.data);
        })
        .catch((error) => console.log(error))
      }, []);


 
  
  props.navigation.setOptions({
    headerTitle: "Profile",
    headerRight: () => (
      <TouchableOpacity
        style={{padding: 6}}
        onPress={() => [
                AsyncStorage.removeItem("jwt"),
                logoutUser(context.dispatch)
            ]}
      >
        <Icon name="sign-out" color="#DD502C" size={28} />
      </TouchableOpacity>
    ),
   headerLeft: () => (
      <View style={{
        paddingLeft:20,
        
      }}>
           <TouchableOpacity style={{
             backgroundColor:"#000000",
             padding:10,
             borderRadius:10
           }}
            onPress={() =>props.navigation.navigate("PostAd")} 
              >
             <Text style={{color: "white", fontWeight: "bold"}}>
               Post Ad
             </Text>
          </TouchableOpacity>
        </View>
    ),
  });

  return (
    <View style={styles.Container}>
       <View style={{
            width: screenWidth,
            flexDirection: 'row',
            alignItems: 'center',
            elevation: 1,
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.3
        }}>
            <View style={{
                width: '100%',
                paddingVertical: 20,
                flexDirection: 'row',
                paddingLeft: 20,
                backgroundColor: 'white',
                alignItems: 'center'
            }}>
                <Image source={{ uri: userProfile ? userProfile.pic : ""}}
                       style={styles.profileImg}/>
                <View style={{flex: 1, marginLeft: 20}}>
                    <Text style={{fontSize: 18, color: Colors.mainText}}>
                      {userProfile ? userProfile.first_name: ""} {userProfile ? userProfile.last_name: ""}</Text>
                    <Text style={{fontSize: 12, color: Colors.pText , marginTop: 4}}>{userProfile ? userProfile.email: ""}</Text>
                </View>
            </View>
        </View>

       <View style={styles.PriceContainer}>
        <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
         <Text style={{
            color: '#f8f8ff',
            fontSize:16,
            fontWeight:"bold",
         }}>
            Your Order
          </Text>
          </View>

      </View>

            <ScrollView style={{flex:1,  }}>
                <View style={styles.order}>
                   <View style={{width: screenWidth,}}>
                       {orders   ? (
                           orders.map((x) => {
                              //  console.log(x);
                               return <OrderCard key={x.id} {...x} />;
                           })
                       ) : (
                           <View style={styles.order}>
                               <Text>You have no orders</Text>
                           </View>
                       )}
                   </View>
               </View>
            </ScrollView>
    </View>
  );
};

// export const screenOptions = (navData) => {
//   return {
//     headerTitle: "Profile",
//     headerRight: () => (
//       <TouchableOpacity
//         style={{padding: 6}}
//         onPress={() => [
//                 AsyncStorage.removeItem("jwt"),
//                 logoutUser(context.dispatch)
//             ]}
//       >
//         <Icon name="sign-out" color="#DD502C" size={28} />
//       </TouchableOpacity>
//     ),
//   };
// };



const styles = StyleSheet.create({
    Container: {
     flex: 1,
    },
    profileImg: {
      width: 85, 
      height: 85, 
      resizeMode: 'contain',
      borderRadius: 120,
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
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical:30
    },
    buttonContainer: {
        flex: 1,
    },
  loginScreenButton:{
   
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    borderBottomWidth: 1,
    // borderWidth: 1,
    borderRadius:10,
    borderColor: Colors.primary
  },
  loginText:{
      color: Colors.primary,
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  },
  comEvent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
    PriceContainer: {
     width: screenWidth,
     flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding:5,
    backgroundColor:"#778899"
  },
    order: {
      width: screenWidth,
      marginTop: 20,
      alignItems: "center",
      marginBottom: 60
  },
});

export default UserProfileScreen;