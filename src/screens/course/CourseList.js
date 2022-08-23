import React from 'react';
import { View, Text,Button, StyleSheet,Dimensions,FlatList } from 'react-native';
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButtons";

import CourseItem from '../../components/app/courseItem';






const CourseList = (props) => {
  const courses = useAppState("courses");
  // console.log(courses);

    const selectItemHandler = (item) => {
      props.navigation.navigate("Single Course", {
        item,
      });
    };



  return (
    <View style={styles.Container}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <CourseItem
            key={itemData.item.id}
            data={itemData.item}
            onSelect={() => { 
              selectItemHandler(itemData.item);
            }}
            // onPress={() => {
            //     onFemale(itemData.item);
            // }}
            />
            )}
          />
      
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Courses",

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
     justifyContent:"center",
     alignItems:"center"
     },
});

export default CourseList;