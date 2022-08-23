import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"


import MathHome, {
  screenOptions as MathHomeOptions,
} from "../screens/MathSolution/MathHome";
import PdfView from "../screens/MathSolution/PdfView";
// import PlayVideo from "../screens/course/PlayVideo";

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
    return(
        <Stack.Navigator screenOptions={defaultNavOptions}>
            <Stack.Screen 
                name="MathHome"
                component={MathHome}
                options={MathHomeOptions}
            
            />
            <Stack.Screen 
                name="Math Solution PDF"
                component={PdfView}
                // options={{
                //     headerShown: false
                // }}
            />
           {/*  <Stack.Screen 
                name="Play Video"
                component={PlayVideo}
                // options={{
                //     headerShown: false
                // }}
            /> */}
        </Stack.Navigator>
    )
}

export default function CartNavigator() {
    return <MyStack />
}