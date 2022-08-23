import React, { useState, useEffect,useContext} from "react";
import { View, FlatList, StyleSheet,Text,TouchableOpacity,Image,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from "../../components/app/CartItem";
import TransactionItem from "../../components/UI/TransactionItem";
import TitleCard from "../../components/UI/TitleCard";
import CircleButton from "../../components/UI/CircularButton";
import  Colors  from '../../constants/Colors';

import {baseURL} from "../../../BaseUrl";
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import axios  from "axios";
import Banner from "../../components/UI/Banner";
import DistricItem from "../../screens/Distric/PropertyDisctic";

const HomeScreen = (props) => {
  const context = useContext(AuthGlobal)
    const showEvents = useAppState("showSale");
    // const [token, setToken] = useState();
    // const [error, setError] = useState(false)
    // const [loading, setLoading] = useState(true);
    // console.log(showEvents);

  // const dispatch = useAppDispatch();
  //  useEffect(() => {
  //     AsyncStorage.getItem("jwt")
  //     .then((res) => {
  //         setToken(res)
  //     })
  //     .catch((error) => console.log(error))

  //     fetch(`${baseURL}api/events`, {
  //       method: "get",
  //       headers: { 
  //         "Content-type": "application/json",
  //         "Authorization": `Bearer ${token}`
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) =>{
  //         setLoading(false);
  //         dispatch({ type: 'SAVE_FEATURED_DATA', payload: data.filter(sp => sp.isFeatured === true)});

  //         dispatch({ type: 'SAVE_EVENTS', payload: data});
  //       }).catch((error) => {
  //       setError(true)
  //     });

  //    fetch(`${baseURL}api/tolets`, {
  //       method: "get",
  //       headers: { 
  //         "Content-type": "application/json",
  //         "Authorization": `Bearer ${token}`
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) =>{
  //         setLoading(false);
  //         dispatch({ type: 'SAVE_TOLETS', payload: data});
  //       }).catch((error) => {
  //       setError(true)
  //     });

  //    fetch(`${baseURL}api/tutors`, {
  //       method: "get",
  //       headers: { 
  //         "Content-type": "application/json",
  //         "Authorization": `Bearer ${token}`
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) =>{
  //         setLoading(false);
  //         dispatch({ type: 'SAVE_TUTORS', payload: data});
  //       }).catch((error) => {
  //       setError(true)
  //     });

  //      axios.get(`${baseURL}api/districs`)
  //     .then((res) => {
  //       dispatch({ type: 'SAVE_DISTRICS', payload: res.data});
  //       // setDistrics(res.data);
  //     })
  //     .catch((error) => {
  //       console.log('Api call error');
  //       //  setError(true)
  //     });


  //   axios.get(`${baseURL}api/events/${context.stateUser.user.id}`)
  //     .then((res) => {
  //       dispatch({ type: 'SAVE_USER_PROPERTY', payload: res.data});
  //     })
  //     .catch((error) => {
  //       console.log('Api call error');
  //        setError(true)
  //     });

  //   axios.get(`${baseURL}api/tolets/${context.stateUser.user.id}`)
  //     .then((res) => {
  //       dispatch({ type: 'SAVE_USER_TOLET', payload: res.data});
  //     })
  //     .catch((error) => {
  //       console.log('Api call error');
  //        setError(true)
  //     });

  //  axios.get(`${baseURL}api/tutors/${context.stateUser.user.id}`)
  //     .then((res) => {
  //       dispatch({ type: 'SAVE_USER_TUTORS', payload: res.data});
  //     })
  //     .catch((error) => {
  //       console.log('Api call error');
  //        setError(true)
  //     });


      


  //   // fetch(`${baseURL}api/events/${context.stateUser.user.id}`, {
  //   //     method: "get",
  //   //     headers: { 
  //   //       "Content-type": "application/json",
  //   //       "Authorization": `Bearer ${token}`
  //   //     },
  //   //   })
  //   //     .then((res) => res.json())
  //   //     .then((data) =>{
  //   //       setLoading(false);  
  //   //       dispatch({ type: 'SAVE_USER_EVENT', payload: data});
  //   //     }).catch((error) => {
  //   //     setError(true)
  //   //   });




  //   }, [])


  const handleSubmit =  () => {
    props.navigation.navigate("TopBarNavigator");
  };


//  if (loading) {
//     return (
//       <View style={{flex:1, justifyContent: "center",alignItems: "center"}}>
//         <ActivityIndicator size="large" color={Colors.primary} />
//       </View>
//     );
//   }

  // if (!loading && showEvents.length === 0) {
  //   return (
  //     <View style={{flex:1, justifyContent: "center",alignItems: "center"}}>
  //       <Text>an error occur ... </Text>
  //     </View>
  //   );
  // }

  const selectItemHandler = (item) => {
    props.navigation.navigate("pdtails", {
      item,
    });
  };

  return (
       <View style={styles.Container}>
              <View style={{position: 'relative'}}>
               <TitleCard text='Sponsored by'/>
               <Banner />
               <DistricItem />
                {/* <FlatList
                    contentContainerStyle={{padding: 5}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={showTolets}
                    renderItem={({item}) => <TransactionItem data={item}/>}
                    keyExtractor={item => item._id}
                /> */}

           <Text style={{fontSize: 16, paddingHorizontal: 10, fontWeight: 'bold'}}>
           Property For Sale</Text>

          <FlatList
              contentContainerStyle={{paddingBottom: 10}}
              data={showEvents}
              keyExtractor={(item) => item._id}
              renderItem={(itemData) => (
                <CartItem
                  key={itemData.item.id}
                  data={itemData.item}
                  onSelect={() => { 
                    selectItemHandler(itemData.item);
                  }}
                 />
                  )}
                />
          </View>
            {context.stateUser.isAuthenticated && (
              <View style={{
                  flex: 1, 
                  alignItems: 'center', 
                  position: 'absolute',
                  bottom: 5,
                  right: 5
                  }}>
                    <CircleButton imgstyle={{width: 20, height: 20}} 
                    img={require('../../../assets/ic_plus.png')}
                    onPress={handleSubmit}  
                    tint_color={'#FFF'} bg_color={Colors.secondary}/>
                </View>
            )}
        </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Property Sale",
  };
};



const styles = StyleSheet.create({
    Container: { 
      flex:1,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center"
    },
});

export default HomeScreen;