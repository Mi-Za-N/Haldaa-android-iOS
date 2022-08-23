import React, { useState, useEffect,useContext} from "react";
import { View, Text, StyleSheet,FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwipeBackView from '../../components/UI/SwipeBackView';

import ToletItem from "../../components/app/ToletItem";
import Icon from "react-native-vector-icons/FontAwesome5";
import InputWithIcon from "../../components/app/InputWithIcon";
import TransactionItem from "../../components/UI/TransactionItem";
import TitleCard from "../../components/UI/TitleCard";
import {baseURL} from "../../../BaseUrl";
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import CircleButton from "../../components/UI/CircularButton";
import  Colors  from '../../constants/Colors';
import Banner from "../../components/UI/Banner";
import DistricItem from "../../screens/Distric/ToletDistric";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButtons";



const EventScreen = (props) => {
    const context = useContext(AuthGlobal)
    const showTolets = useAppState("showTolets");
    const [token, setToken] = useState();
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true);

    // console.log(showTolets);

  const dispatch = useAppDispatch();
   useEffect(() => {
      AsyncStorage.getItem("jwt")
      .then((res) => {
          setToken(res)
      })
      .catch((error) => console.log(error))

      fetch(`${baseURL}api/events`, {
        method: "get",
        headers: { 
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
        .then((res) => res.json())
        .then((data) =>{
          setLoading(false);
          dispatch({ type: 'SAVE_FEATURED_DATA', payload: data.filter(sp => sp.isFeatured === true)});
          dispatch({ type: 'SAVE_EVENTS', payload: data});
        }).catch((error) => {
        setError(true)
      });

    }, [])

  const selectItemHandler = (item) => {
    props.navigation.navigate("ToletDetail", {
      item,
    });
  };

  let myVar = 0;
  const handleOnChange = (text) => {
    if (myVar) clearTimeout(myVar);
     myVar = setTimeout(function(){ dispatch({ type: 'SET_SEARCH_TERM', payload: text }); }, 500);
    
  };


  const handleSubmit =  () => {
    props.navigation.navigate("topBarTolet");
  };

   props.navigation.setOptions({
    headerTitle: "Sublet",
    headerRight: () => (
         <View style={{flexDirection: "row", paddingHorizontal:10}}>
            <InputWithIcon 
            text_color={"#000"} 
            placeholderTextColor={'#000'} bg_color={'#f8f8ff'} 
            // onChangeText={(text) => handleOnChange(text)}
            // value={value}
            onChange={text => handleOnChange(text)}
            />
            <View style={{backgroundColor: "#f8f8ff", justifyContent: "center", paddingHorizontal: 5, marginHorizontal: 5}}>
             <Icon name="search" color="black" size={26} />
            </View>
        </View>
    ),
  });



  return (
    <SwipeBackView style={{flex: 1, backgroundColor: "white"}}
            onSwipeBack={() => pageContext.pageDispatch({page: 'pop'})} >
           <TitleCard text='Sponsored by'/>
            <Banner />
             <DistricItem />
        {/* <View style={{flexDirection: "row"}}>
            <InputWithIcon 
            text_color={"#000"} 
            placeholderTextColor={'#000'} bg_color={'#f8f8ff'} 
            // onChangeText={(text) => handleOnChange(text)}
            // value={value}
            onChange={text => handleOnChange(text)}
            />
            <View style={{backgroundColor: "#f8f8ff", justifyContent: "center", paddingHorizontal: 5, marginHorizontal: 5}}>
             <Icon name="search" color="black" size={26} />
            </View>
        </View> */}


            {/* <TitleCard text='Featured Room mate Wanted'/>
                <FlatList
                    contentContainerStyle={{padding: 5}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={showFeatured}
                    renderItem={({item}) => <TransactionItem data={item}/>}
                    keyExtractor={item => item._id}
                /> */}

    <Text style={{fontSize: 16, paddingHorizontal: 10, fontWeight: 'bold'}}>All Available Roommate Wanted</Text>
        
          <FlatList
            data={showTolets}
            keyExtractor={(item) => item._id}
            renderItem={(itemData) => (
              <ToletItem
                key={itemData.item.id}
                data={itemData.item}
                onSelect={() => { 
                    selectItemHandler(itemData.item);
                  }}
                />
                )}
           />

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
            
        </SwipeBackView>
  );
};


export const screenOptions = (navData) => {
  return {
    headerTitle: "Sublet",

    headerLeft: () => (
      <View style={{flex: 1,flexDirection: "row"}}>
      
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "menu-unfold" : "menu-unfoldu"}
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
     justifyContent: "center",
     alignItems: "center"
    },

});

export default EventScreen;

