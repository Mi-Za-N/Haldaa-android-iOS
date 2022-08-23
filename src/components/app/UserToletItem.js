import React, {useState, useEffect } from 'react';
import { View, Text, StyleSheet,Dimensions,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";
import {baseURL} from "../../../BaseUrl";


const screenWidth = Dimensions.get('window').width;



const UserToletItem = ({ data}) => {
 const [token, setToken] = useState();
 // console.log("data=>",data._id);

 



   useEffect(() => {
     AsyncStorage.getItem("jwt")
      .then((res) => {
          setToken(res)
      })
      .catch((error) => console.log(error))
   },[]);




 const deletItem = () =>{

   fetch(`${baseURL}api/tolets/delete/${data._id}`, {
        method: "DELETE",
        headers: { 
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
        .then((res) => res.json())
        .then((data) =>{
            if (data) {
          Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Item Deleted",
        });
        }
        })
        .catch((error) => {
        // setError(true)
      });
}


return (
        <View style={{
            height: 70,
            width: screenWidth - 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: 10,
            marginHorizontal: 10,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 5,
            borderRadius: 5,
            elevation: 3,
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingVertical: 15
        }}>
            <View style={{flex: 1, paddingHorizontal: 10}}>
                <Text style={{fontSize: 12, fontWeight: 'bold', color: '#272b43'}}>{data.title}</Text>
            </View>
       <TouchableOpacity
             style={{padding: 6}}
             onPress={() =>deletItem()}
           >
        <Icon name="trash" color="#DD502C" size={28} />
      </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: { },
});

export default UserToletItem;