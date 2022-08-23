import React from "react"
import { createStackNavigator } from "@react-navigation/stack"


import DashbardScreen, {
    screenOptions as DashbardScreenOptions,
} from "../screens/app/DashbardScreen";
import TutorScreen, {
  screenOptions as TutorScreenOptions,
} from "../screens/app/TutorScreen";
import NotificationScreen, {
  screenOptions as NotificationScreenOptions,
} from "../screens/app/NotificationScreen";
import TutorDetailScreen from "../screens/app/TutorDetailScreen";
import TopBarTutorNavigator from "./TopBarTutorNavigator";
import TopBarTuitionNavigator from "./TopBarTuitionNavigator"

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
                name="Dashboard"
                component={DashbardScreen}
                options={DashbardScreenOptions}
            />
            <Stack.Screen 
                name="TutorScreen"
                component={TutorScreen}
                options={TutorScreenOptions}
            />
            <Stack.Screen 
                name="TutorDetail"
                component={TutorDetailScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='notification'
                component={NotificationScreen}
                options={NotificationScreenOptions}
            />
            
         <Stack.Screen 
                name="TopBarTutor"
                component={TopBarTutorNavigator}
                options={{
                    headerShown: false
                }}
            />
         <Stack.Screen 
                name="TutorReq"
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