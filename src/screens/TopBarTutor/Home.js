import React, {useState, useEffect,useContext }  from 'react';
import { View, Text,ScrollView, StyleSheet,Dimensions } from 'react-native';
import axios  from "axios";
import {baseURL} from "../../../BaseUrl";
import MultiColumnView from '../../components/UI/MultiColumnView';
import UserTuitionItem from "../../components/app/UserTuitionItem";
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";

const screenWidth = Dimensions.get('window').width;

const Home = ({ }) => {
  const context = useContext(AuthGlobal)
  const [indUser, setIndUser] = useState([]);
  const [error, setError] = useState(false);

  useEffect(()=>{
       axios.get(`${baseURL}api/tutors/${context.stateUser.user.id}`)
      .then((res) => {
        setIndUser(res.data);
        // dispatch({ type: 'SAVE_USER_TUTORS', payload: res.data});
      })
      .catch((error) => {
        console.log('Api call error');
         setError(true)
      });
  },[]);
  return (
      <View style={styles.Container}>
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
                data={indUser}
                renderItem={(item) => <UserTuitionItem data={item}/>}
            />
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    Container: {
     flex:1,
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