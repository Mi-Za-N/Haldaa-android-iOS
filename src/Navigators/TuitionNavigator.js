import React from "react"
import { createStackNavigator } from "@react-navigation/stack"


import TuitionScreen, {
  screenOptions as TuitionScreenOptions,
} from "../screens/app/TuitionScreen";
// import TuitionScreen from "../screens/app/TuitionScreen";
import TutionDetailScreen from "../screens/app/TuitionDetailScreen";
import TopBarTuitionNavigator from "./TopBarTuitionNavigator";

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
        <Stack.Navigator  screenOptions={defaultNavOptions}>
            <Stack.Screen 
                name="TuitionScreen"
                component={TuitionScreen}
                options={TuitionScreenOptions}
                />
                {/* // headerShown: false */}
            <Stack.Screen 
                name="Tution Detail"
                component={TutionDetailScreen}
                // options={{
                //     headerShown: false
                // }}
            />
            
            
         <Stack.Screen 
                name="TopBarTuition"
                component={TopBarTuitionNavigator}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}
export default function CommunitiesNavigator() {
    return <MyStack />
}