import React, { useState, useEffect,useContext} from "react";
import { View, FlatList, StyleSheet,Text,TouchableOpacity,Image,ActivityIndicator } from 'react-native';

import RentItems from "../../components/app/RentItems";
import TransactionItem from "../../components/UI/TransactionItem";
import TitleCard from "../../components/UI/TitleCard";
import CircleButton from "../../components/UI/CircularButton";
import  Colors  from '../../constants/Colors';
import Icon from "react-native-vector-icons/FontAwesome";

import AuthGlobal from "../../contexts/auth/store/AuthGlobal";
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import InputWithIcon from "../../components/app/InputWithIcon";
import Banner from "../../components/UI/Banner";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButtons";
import DistricItem from "../../screens/Distric/RentDistric";

const RentScreen = (props) => {
  const context = useContext(AuthGlobal)
    const showRents = useAppState("showRent");
    

  // if (!loading && showEvents.length === 0) {
  //   return (
  //     <View style={{flex:1, justifyContent: "center",alignItems: "center"}}>
  //       <Text>an error occur ... </Text>
  //     </View>
  //   );
  // }

   let myVar = 0;
  const handleOnChange = (text) => {
    if (myVar) clearTimeout(myVar);
     myVar = setTimeout(function(){ dispatch({ type: 'SET_SEARCH_RENT', payload: text }); }, 500);
    
  };

  const selectItemHandler = (item) => {
    props.navigation.navigate("RentDetails", {
      item,
    });
  };

  const handleSubmit =  () => {
    props.navigation.navigate("TopRent");
  };


    props.navigation.setOptions({
    headerTitle: "Flat Rent",
    headerRight: () => (
        <View style={{flexDirection: "row",paddingHorizontal:10}}>
            <InputWithIcon 
            text_color={"#000"} 
            placeholderTextColor={'#000'} bg_color={'#f8f8ff'} 
            onChange={text => handleOnChange(text)}
            />
            <View style={{backgroundColor: "#f8f8ff", justifyContent: "center", paddingHorizontal: 5, marginHorizontal: 5}}>
             <Icon name="search" color="black" size={26} />
            </View>
        </View>
    ),
  });

  return (
       <View style={styles.Container}>
         <View style={{position: 'relative'}}>
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
                    data={showTolets}
                    renderItem={({item}) => <TransactionItem data={item}/>}
                    keyExtractor={item => item._id}
                /> */}
                

           <Text style={{fontSize: 16, paddingHorizontal: 10, fontWeight: 'bold'}}>
           Flat Rent</Text>

          <FlatList
              contentContainerStyle={{paddingBottom: 10}}
              data={showRents}
              keyExtractor={(item) => item._id}
              renderItem={(itemData) => (
                <RentItems
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
    headerTitle: "Rent",

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

// export const screenOptions = (navData) => {
//   return {
//     headerTitle: "Googly",
//     headerRight: () => (
//       <TouchableOpacity
//         style={{padding: 6}}
//         onPress={() => navData.navigation.navigate("notification")}
//       >
//         <Icon name="bell" color="black" size={28} />
//       </TouchableOpacity>
//     ),
//   };
// };



const styles = StyleSheet.create({
    Container: { 
      flex:1,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center"
    },
});

export default RentScreen;