import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";




import HomeScreen, {
    screenOptions as HomeScreenOptions,
} from "../screens/app/HomeScreen";
import PropertyDetails, {
  screenOptions as PropertyDetailsnOptions,
}  from '../screens/app/PropertyDetails';
import TopBarNavigation from "./TopBarNavigation";

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


const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator screenOptions={defaultNavOptions}>
            <Stack.Screen 
                name="home"
                component={HomeScreen}
                options={HomeScreenOptions}
            />


            <Stack.Screen 
                name='TopBarNavigator'
                component={TopBarNavigation}
                options={{
                    // headerShown: false,
                }}
            />

           <Stack.Screen 
                name='pdtails'
                component={PropertyDetails}
                options={PropertyDetailsnOptions}
            />
           
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />;
}