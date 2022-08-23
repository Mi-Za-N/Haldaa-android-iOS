import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TutorHome from "../screens/TopBarTuitoin/TuitionHomeScreen";
import TutorCreate from "../screens/TopBarTuitoin/TuitionCreateScreen";



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
        name="TutorCreate"
        component={TutorCreate}
        options={{ tabBarLabel: 'Create' }}
      />
     <Tab.Screen
        name="TutorHome"
        component={TutorHome}
        options={{ tabBarLabel: 'Yours' }}
      />
    </Tab.Navigator>
  );
}
export default function TopBarNavigation() {
  return  <MyTabs />
}
