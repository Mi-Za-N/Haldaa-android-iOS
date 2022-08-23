import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Home from "../screens/TopBarToLet/Home";
import Create from "../screens/TopBarToLet/create";
// import ImageDes from "../screens/TopBarProperty/ImageDes";
// import ContactInfo from "../screens/TopBarProperty/ContactInfo";



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
          marginTop:30,
          paddingVertical: Platform.OS === 'ios' ? 10 : 0,
          height: 48,
          backgroundColor: "#f5f5f5",
        }
      }}
    >  
     <Tab.Screen
        name="TopBarToletHome"
        component={Home}
        options={{ tabBarLabel: 'Dashboard' }}
      />
    <Tab.Screen
        name="TopBarToletCreate"
        component={Create}
        options={{ tabBarLabel: 'Create' }}
      />
    </Tab.Navigator>
  );
}
export default function TopBarNavigation() {
  return  <MyTabs />
}
