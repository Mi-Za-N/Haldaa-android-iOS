import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

// import RentScreen from "../screens/app/RentScreen";

import LinkHomeScreen, {
  screenOptions as LinkHomeScreenOptions,
} from "../screens/LinksDaily/LinkHomeScreen";
import LinkView from "../screens/LinksDaily/LinkView";
import CreatePost from "../screens/LinksDaily/CreatePost";

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
                name="LinksDailyHome"
                component={LinkHomeScreen}
                options={LinkHomeScreenOptions}
            
            />
            <Stack.Screen 
                name="LinkView"
                component={LinkView}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="CreatePost"
                component={CreatePost}
                // options={{
                //     headerShown: false
                // }}
            />
        </Stack.Navigator>
    )
}

export default function CartNavigator() {
    return <MyStack />
}