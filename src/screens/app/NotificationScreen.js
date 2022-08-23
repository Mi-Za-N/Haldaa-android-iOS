import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import  List from "../../components/UI/NotiList";

 const contactArr = [
    {
        name: 'Lorum ipsum dollar site ammet, lorum ipsum dollar',
        location: 'San Fransico, CA',
        image: "https://res.cloudinary.com/dsop4plsb/image/upload/v1640870030/piz7hqz6l9j69dxle4wa.jpg",
    },
    {
        name: 'Kimberly White',
        location: 'Manhattan, NY',
        image: "https://res.cloudinary.com/dsop4plsb/image/upload/v1640870030/piz7hqz6l9j69dxle4wa.jpg",

    },
    {
        name: 'Steve Rogers',
        location: 'Brooklyn, NY',
        image: "https://res.cloudinary.com/dsop4plsb/image/upload/v1640870030/piz7hqz6l9j69dxle4wa.jpg",
    },
    {
        name: 'Amy Patterson',
        location: 'Little Indian, ABQ',
        image: "https://res.cloudinary.com/dsop4plsb/image/upload/v1640870030/piz7hqz6l9j69dxle4wa.jpg",
    },
    {
        name: 'Hannah Paige',
        location: 'San Fransisco, CA',
        image: "https://res.cloudinary.com/dsop4plsb/image/upload/v1640870030/piz7hqz6l9j69dxle4wa.jpg",
    },
];

const NotificationScreen = (props) => {
  return (
         <View style={styles.Container}>
           <Text>No Notification Yet</Text>
         </View>
          // <FlatList
          //      keyExtractor={(item, index) => index.toString()}
          //      data={contactArr}
          //      renderItem={({item, index}) =>
          //          <List item={item}
          //       onPress={() => props.navigation.navigate("EventDetail")}
          //          />

          //      }
          //  />
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Notification",
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

export default NotificationScreen;