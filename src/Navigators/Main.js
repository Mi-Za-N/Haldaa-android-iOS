import React, { useContext } from "react";
import { View, Text, StyleSheet,ScrollView,Dimensions, Image,SafeAreaView,Button } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import Fontisto from "react-native-vector-icons/Fontisto";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFoundation from "react-native-vector-icons/Foundation";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";

// Stacks
import ToletNavigator from "./ToletNavigator";
import RentNavigator from "./RentNavigator";
import HomeNavigator from "./HomeNavigator";
import UserNavigator from "./UserNavigator";
import LoginNavigator from "./LoginNavigator";
import TutorNavigator from "./TutorNavigator";
import AdminNavigator from "./AdminNavigators";
import LinksNavigator from "./LinksNavigator";
import TshirtNavigator from "./TshirtNavigator";
import TuitionNavigator from "./TuitionNavigator";
import CourseNavigator from "./CourseNavigator";
import MathNavigator from "./MathNavigator";
import ShopNavigator from "./ShopNavigator";

import AuthGlobal from "../contexts/auth/store/AuthGlobal";



const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const context = useContext(AuthGlobal)
  // console.log(context.stateUser.userProfile.email);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#006400",
        tabBarInactiveTintColor: "#a9a9a9",
        keyboardHidesTabBar: true,
        // tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 10 : 0,
          height: 48,
          backgroundColor: "#f5f5f5",
        }
      }}
    >

      <Tab.Screen
        name="Home"
        component={TutorNavigator}
        options={{
          headerShown:false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="apps-sharp" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Sublet"
        component={ToletNavigator}
        options={{
          headerShown:false,
          tabBarLabel: 'Sublet',
          tabBarIcon: ({ color }) => (
            <Icon name="bed" color={color} size={30} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Flat Rent"
        component={RentNavigator}
        options={{
           headerShown: false,
          tabBarLabel: 'Rent',
          tabBarIcon: ({ color }) => (
            <View>
              <Fontisto name="room" color={color} size={30} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Flat Sale"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Sale',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="building" color={color} size={30} />
          ),
        }}
      />


    {/* {context.stateUser.userProfile.email == "mizan@gmail.com"  ? (
     <Tab.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={30} />
          ),
        }}
      />
      ): null } */}
    {context.stateUser.isAuthenticated && (
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
       )}
      {!context.stateUser.isAuthenticated && (
      <Tab.Screen
        name="Sign Up"
        component={LoginNavigator}
        options={{
          tabBarLabel: 'Sign Up',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
      )}
      
    </Tab.Navigator>
  );
};

// export default Main;


const ShopDrawerNavigator = createDrawerNavigator();

 const Main = () => {
  return (
      <ShopDrawerNavigator.Navigator
        drawerContent={(props) => {
          return (
            <View style={{ flex: 1, paddingTop: 40 }}>
              <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                <DrawerItemList {...props} />
              </SafeAreaView>
            </View>
          );
        }}
        screenOptions={{
          activeTintColor: "red",
        }}
      >
        <ShopDrawerNavigator.Screen
          name="Home"
          component={TabNavigator}
           options={{
            headerShown: false,
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "apps" : "apps"}
                size={22}
                color={props.color}
              />
            ),
          }}
        />


       <ShopDrawerNavigator.Screen
          name="Tuition"
          component={TuitionNavigator}
          options={{
            headerShown: false,
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "book" : "book"}
                size={22}
                color={props.color}
              />
            ),
          }}
        />

        <ShopDrawerNavigator.Screen
          name="Courses"
          component={CourseNavigator}
          options={{
            headerShown: false,
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "tv" : "tv"}
                size={22}
                color={props.color}
              />
            ),
          }}
        />

        <ShopDrawerNavigator.Screen
          name="Photo contest"
          component={LinksNavigator}
          options={{
            headerShown: false,
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "camera" : "camera"}
                size={22}
                color={props.color}
              />
            ),
          }}
        />

        <ShopDrawerNavigator.Screen
          name="Tshirt-Design"
          component={TshirtNavigator}
          options={{
            headerShown: false,
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-shirt" : "ios-shirt"}
                size={22}
                color={props.color}
              />
            ),
          }}
        />
        <ShopDrawerNavigator.Screen
          name="Math Solution 5-10"
          component={MathNavigator}
          options={{
            headerShown: false,
            drawerIcon: (props) => (
              <MatIcon
                name={Platform.OS === "android" ? "math-integral-box" : "math-integral-box"}
                size={22}
                color={props.color}
              />
            ),
          }}
        />

        <ShopDrawerNavigator.Screen
          name="Haldaa Store"
          component={ShopNavigator}
          options={{
            headerShown: false,
            drawerIcon: (props) => (
              <MatIcon
                name={Platform.OS === "android" ? "shopping-outline" : "shopping-outline"}
                size={22}
                color={props.color}
              />
            ),
          }}
        />

      </ShopDrawerNavigator.Navigator>
  );
};

export default Main;
