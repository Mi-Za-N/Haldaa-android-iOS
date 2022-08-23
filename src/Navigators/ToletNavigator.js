import React from "react"
import { createStackNavigator } from "@react-navigation/stack"


import ToletScreen, {
  screenOptions as ToletScreenOptions,
} from "../screens/app/ToletScreen";
import DetailScreen from "../screens/app/DetailScreen";
import ToBarToLetNavigator from "./ToBarToLetNavigator";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "#006400" : "",
  },
//   headerTitleStyle: {
//     fontFamily: "open-sans-bold",
//   },
//   headerBackTitleStyle: {
//     fontFamily: "open-sans",
//   },
  headerTintColor: Platform.OS === "android" ? "white" : "red",
};



const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator screenOptions={defaultNavOptions}>
            
            <Stack.Screen 
                name='ToletHome'
                component={ToletScreen}
                options={ToletScreenOptions}
            />
            <Stack.Screen 
                name='ToletDetail'
                component={DetailScreen}
                options={{
                    headerShown: false,
                }}
            />
             <Stack.Screen 
                name='topBarTolet'
                component={ToBarToLetNavigator}
                options={{
                    tabBarLabel: 'Tolet',
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}
export default function AdminNavigator() {
    return <MyStack />
}