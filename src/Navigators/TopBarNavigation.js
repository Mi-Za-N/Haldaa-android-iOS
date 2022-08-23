import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Home from "../screens/TopBarProperty/Home";
import MainFeatured from "../screens/TopBarProperty/MainFeature";
import ImageDes from "../screens/TopBarProperty/ImageDes";
import ContactInfo from "../screens/TopBarProperty/ContactInfo";



const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const insets = useSafeAreaInsets()
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#006400",
        tabBarInactiveTintColor: "#dcdcdc",
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
        name="PropertyHome"
        component={Home}
        options={{ tabBarLabel: 'Yours' }}
      />
    <Tab.Screen
        name="MainFeatur"
        component={MainFeatured}
        options={{ tabBarLabel: 'Main Feature' }}
      />
      <Tab.Screen
        name="ImageDes"
        component={ImageDes}
        options={{ 
          headerShown: false,
          tabBarLabel: 'Image & Description',
       }}
      />
      <Tab.Screen
        name="ContactInfo"
        component={ContactInfo}
        options={{ tabBarLabel: 'Contact & Billing info ' }}
      />
    </Tab.Navigator>
  );
}
export default function TopBarNavigation() {
  return  <MyTabs />
}
