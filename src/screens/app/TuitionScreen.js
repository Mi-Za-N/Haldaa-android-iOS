import React, { useState, useEffect,useContext} from "react";
import { View, FlatList, StyleSheet,Text,TouchableOpacity,Image,ActivityIndicator } from 'react-native';


import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import AsyncStorage from '@react-native-async-storage/async-storage';
import TuitionItem from "../../components/app/TuitionItem";
import TransactionItem from "../../components/UI/TransactionItem";
import CircleButton from "../../components/UI/CircularButton";
import  Colors  from '../../constants/Colors';
import Icon from "react-native-vector-icons/FontAwesome";
import {baseURL} from "../../../BaseUrl";
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import InputWithIcon from "../../components/app/InputWithIcon";
import Banner from "../../components/UI/Banner";
import TuitionBanner from "../../components/UI/TuitionBanner";
import TitleCard from "../../components/UI/TitleCard";

const TuitionScreen = (props) => {
    const context = useContext(AuthGlobal)
    const tuitions = useAppState("tuitions");
    const [token, setToken] = useState();

    // console.log(tuition);


     useEffect(() => {
      AsyncStorage.getItem("jwt")
      .then((res) => {
          setToken(res)
      })
      .catch((error) => console.log(error))

     }, [])


      const selectItemHandler = (item) => {
        props.navigation.navigate("Tution Detail", {
          item,
        });
      };

      props.navigation.setOptions({
        headerTitle: "Tuition",
          headerRight: () => (
          <View style={{
            paddingRight:20,
            
          }}>
              <TouchableOpacity style={{
                backgroundColor:"#000000",
                padding:10,
                borderRadius:10
              }}
                onPress={() => props.navigation.navigate("TutorReq")} 
                  >
                <Text style={{color: "white", fontWeight: "bold"}}>
                  Post
                </Text>
              </TouchableOpacity>
            </View>
        ),
      });



  return (
    <>
    {tuitions.length >0 ? (
        <View style={styles.Container}>
         <View style={{flex:1,justifyContent:"flex-start"}}>
           <TitleCard text='Sponsored by'/>
           <TuitionBanner />
           <Text style={{fontSize: 16, paddingHorizontal: 10, fontWeight: 'bold'}}>
           Available Tuition</Text>

          <FlatList
              contentContainerStyle={{paddingBottom: 10}}
              data={tuitions}
              keyExtractor={(item) => item._id}
              renderItem={(itemData) => (
                <TuitionItem
                  key={itemData.item.id}
                  data={itemData.item}
                  onSelect={() => { 
                    selectItemHandler(itemData.item);
                  }}
                 />
                  )}
            />
          </View>
        </View>
    ) : (
      <>
      <TuitionBanner />
      <View style={{
        flex:1,
        paddingTop:-40,
        justifyContent:'flex-start',
        alignItems:"center"}}>
        <Text style={{fontWeight:"700",fontSize:22}}>No Available Tuition now</Text>
        <View>
        <Text>Daily check here</Text>
      </View>
      </View>
      </>
    )}
       
      </>
  );
};


export const screenOptions = (navData) => {
  return {
    headerLeft: () => (
      <View style={{flex: 1,flexDirection: "row"}}>
      
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "menu-unfold" : "menu-unfold"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
      </View>
    ),
  };
};



const styles = StyleSheet.create({
    Container: { 
     flex:1,
     justifyContent:"flex-start",
     alignItems:"center",
    },
});

export default TuitionScreen;