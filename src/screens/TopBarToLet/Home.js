import React, {useState, useEffect,useContext } from 'react';
import { View,Button, Text,ScrollView, StyleSheet,Dimensions } from 'react-native';
import axios  from "axios";
import {baseURL} from "../../../BaseUrl";
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";


import MultiColumnView from '../../components/UI/MultiColumnView';
import UserToletItem from "../../components/app/UserToletItem";


const screenWidth = Dimensions.get('window').width;

const Home = (props) => {
  const context = useContext(AuthGlobal)
   const [userTolets, setUserTolets] = useState([]);


    useEffect(() =>{
     axios.get(`${baseURL}api/tolets/${context.stateUser.user.id}`)
      .then((res) => {
        setUserTolets(res.data);
      })
      .catch((error) => {
        console.log('Api call error');
         setError(true)
      });
   },[]);
  // console.log(showTolet);
  return (
       <View style={styles.Container}>
      {userTolets.length > 0 ? (
            <>
       <View style={styles.PriceContainer}>
        <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
         <Text style={{
            color: '#f8f8ff',
            fontSize:16,
            fontWeight:"bold",
         }}>
           Your Dashboard
          </Text>
          </View>
      </View>

        <ScrollView style={{flex:1}}>
            <MultiColumnView
                containerStyle={{padding: 5,}}
                data={userTolets}
                renderItem={(item) => <UserToletItem data={item}/>}
            />
        </ScrollView>
            </>
          ):(
            <View style={styles.Container}><Text>
             You don't create any post yet
             </Text>
               <Button
               title="Go To Create"
                onPress={() => props.navigation.navigate("TopBarToletCreate")}  
              />
             </View>
          )}
        
    </View>
  );
};

const styles = StyleSheet.create({
    Container: {
     flex:1,
     justifyContent:"center",
     alignItems:"center",
     },
    PriceContainer: {
     width: screenWidth,
     flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding:5,
    backgroundColor:"#778899"
  },
});

export default Home;